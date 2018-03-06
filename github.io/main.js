// The 7 letters in circle of fifths order.
const root_letters = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];

// Enum: Qualities
const major = 0;
const minor = 1;
const diminished = 2;
const dominant = 3;
const quality_texts = ["", "m", "dim", "dom"];

// Qualities of chords ordered by scale steps
const major_qualities = [major, minor, minor, major, dominant, minor, diminished];
const minor_qualities = [minor, diminished, major, minor, minor, major, dominant];

// Circle of Fifth's Offsets of scale tones
const major_scale_offsets = [0, 2, 4, -1, 1, 3, 5];
const minor_scale_offsets = [0, 2, -3, -1, 1, -4, -2];

// Enum: Tonal Gravity Transitions
const step_up = 0;
const step_down = 1;
const leap_up = 2;
const leap_down = 3;
const parallel_motion = 4;
const tonal_gravity_transition_texts = ['su', 'sd', 'lu', 'ld', 'pm'];

const flat_text = 'b';
const double_flat_text = 'bb';
const triple_flat_text = 'bbb';
const sharp_text = '#';
const double_sharp_text = '##';
const triple_sharp_text = '###';

const numeral_texts = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

const roman_numeral_dominant_text = '7';
const roman_numeral_diminished_text = 'o';
const scale_length = 7;

const make_tone = function(letter, num_accidentals) {
    return { letter: letter,
	     num_accidentals: num_accidentals,
	   };
}

const make_chord = function(root, quality) {
    return { root: root, quality: quality };
};

const quality_text = function (quality) {
    return quality_texts[quality];
};

const tonal_gravity_transition_text = function(transition) {
    return tonal_gravity_transition_texts[transition];
};

const accidental_text = function(num_accidentals) {
    switch (num_accidentals) {
    case -3: return triple_flat_text;
    case -2: return double_flat_text;
    case -1: return flat_text;
    case 1: return sharp_text;
    case 2: return double_sharp_text;
    case 3: return triple_sharp_text;
    }
    Console.assert(num_accidentals >= -3 && num_accidentals <= 3, "Too many sharps or flats.")
    return '';
}

const root_text = function (root) {
    return root.letter.toUpperCase() + accidental_text(root.num_accidentals);
};

const root_tone_from_fifth_position = function(idx) {
    if (idx < 0) { // negative number indicates flat
	var num_flats = Math.trunc(-idx / (scale_length + 1)) + 1;
	idx += num_flats * scale_length;
	return make_tone(root_letters[idx % scale_length], -num_flats);
    }
    return make_tone(root_letters[idx % 7], Math.trunc(idx / scale_length));
};

const fifth_position = function (r) {
    // Convert a tone into an index into the circle of fifths.
    // ..., eb=-2, bb = -1, f = 0, c = 1, g = 2, ...
    return root_letters.indexOf(r.letter) + r.num_accidentals * scale_length;
};

const tonal_gravity_transition = function(r1, r2) {
    // one of [lu, ld, su, sd, pm]
    // Calculate the transition from r1 to r2
    var f1 = fifth_position(r1), f2 = fifth_position(r2);
    if (f1 === f2) {
	return parallel_motion;
    }
    if (f2 === f1 - 1) {
	return step_down;
    }
    if (f2 === f1 + 1) {
	return step_up;
    }
    if (f2 < f1) {
	return leap_down;
    }
    return leap_up;
};

const chord_text = function(chord) {
    return root_text(chord.root) + quality_text(chord.quality);
};

const chords_eql = function(c1, c2) {
    // True if two chords are the exact same.
    return c1.root.letter == c2.root.letter && 
	c1.root.num_accidentals == c2.root.num_accidentals && 
	c1.quality == c2.quality;
}

const roman_numeral_text = function(scale_step, quality) {
    // scale_step: 0-6
    var text = numeral_texts[scale_step];
    if (quality == major || quality == dominant) {
	text = text.toUpperCase();
	if (quality == dominant)
	    text += roman_numeral_dominant_text;
    } else if (quality == diminished) {
	text += ' ' + roman_numeral_diminished_text;
    }
    return text;
}

const composition_analysis = function(composition_chords, key) {
    // Analysis: [{chord, scale_step, tonal_gravity_transition}]
    
    var chords = diatonic_chords(key);
    var analysis = [];
    
    for (var i = 0; i < composition_chords.length; ++i) {
	var chord = composition_chords[i];
	var tmp = { chord: chord };
	
	var scale_step = null;
	if (key) {
	    for (var j = 0; j < chords.length; j++) {
		if (chords_eql(chord, chords[j])) {
		    scale_step = j;
		}
	    }
	}
	tmp.scale_step = scale_step;
	
	var is_first_chord = i === 0;
	var tg = null;
	if (!is_first_chord) {
	    var prev_chord = composition_chords[i - 1];
	    tg = tonal_gravity_transition(prev_chord.root, chord.root);
	}
	tmp.tonal_gravity_transition = tg;
	analysis.push(tmp);
    }
    return analysis;
}

const diatonic_chord = function(key, scale_step) {
    // scale_step: 1-7
    var p = fifth_position(key.root);
    scale_step = (scale_step - 1) % 7;
    var is_major = key.quality == major;
    var offset = is_major ? major_scale_offsets[scale_step] : minor_scale_offsets[scale_step];
    var quality = is_major ? major_qualities[scale_step] : minor_qualities[scale_step];
    var p2 = p + offset;
    var tone = root_tone_from_fifth_position(p2);
    return make_chord(tone, quality);
}

const diatonic_chords = function(key) {
    // all of the diatonic chords in key
    var chords = [];
    for (var i = 1; i < 8; i++) {
	chords.push(diatonic_chord(key, i));
    }
    return chords;
}

const c_major = make_chord(make_tone('c', 0), major);
const ab_minor = make_chord(make_tone('a', -1), minor);

const grand_cadence = function(key) {
    return [diatonic_chord(key, 1),
	    diatonic_chord(key, 4),
	    diatonic_chord(key, 1),
	    diatonic_chord(key, 5),
	    diatonic_chord(key, 1)
	   ];
}

const composition_text = function(composition_chords, key) {
    // For the web version
    var text = '';
    var analysis = composition_analysis(composition_chords, key);

    for (var i = 0; i < analysis.length; ++i) {
	var tmp = analysis[i];
	if (tmp.tonal_gravity_transition !== null) {
	    text += tonal_gravity_transition_text(tmp.tonal_gravity_transition) + ' ';
	}
	text += chord_text(tmp.chord);
	if (tmp.scale_step !== null) {
	    text += '(' + roman_numeral_text(tmp.scale_step, tmp.chord.quality) + ')';
	}
	text += ' ';
    }
    return text;
}

function main() {
    var key = ab_minor;
    //var composition_chords = grand_cadence(key);
    var composition_chords = diatonic_chords(key);
    addElements([
	e("div", composition_text(composition_chords, key))
    ]);
}

/*
function main() {
	addElements([
			e("h1", "Home"),
			e("h2", "Prototypes"),
			ulist([
				a("prototypes/compose/index.html", "Compose"),
				a("prototypes/waves/index.html", "Waves")
				])
			]);
}
*/
window.onload = main;
