const chord_quality_options = ['Maj', 'Min', 'Dom', 'Dim'];
const key_quality_options = ['Maj', 'Min'];
const root_tone_options = ['A', 'A#/Bb', 'B', 'Bb', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G'];

const make_tone = function(letter, num_accidentals) {
    return { letter: letter,
	     num_accidentals: num_accidentals,
	   };
}

const root_letters = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];

const major_qualities = ['Maj', 'Min', 'Min', 'Maj', 'Dom', 'Min', 'Dim'];
const major_scale_offsets = [0, 2, 4, -1, 1, 3, 5];
const minor_qualities = ['Min', 'Dim', 'Maj', 'Min', 'Min', 'Maj', 'Dom'];
const minor_scale_offsets = [0, 2, -3, -1, 1, -4, -2];

const step_up = "(S.U.)";
const step_down = "(S.D.)";
const leap_up = "(L.U.)";
const leap_down = "(L.D.)";
const parallel_motion = "(P.M.)";

const major = "";
const minor = "m";
const diminished = "dim";
const dominant = "dom";

const make_chord = function(root, quality) {
    return { root: root, quality: quality };
};

const quality_text = function (quality) {
    switch (quality) {
    case 'Maj': return major;
    case 'Min': return minor;
    case 'Dom': return dominant;
    case 'Dim': return diminished;
    }
    return '';
};

const repeat_text = function(times, text) {
    var res = '';
    for (var i = 0; i < times; ++i)
	res += text;
    return res;
}

const root_text = function (root) {
    return root.letter.toUpperCase() + 
	repeat_text(Math.abs(root.num_accidentals),
		    root.num_accidentals > 0 ? '#' : 'b');
};

const analysis_text = function(analysis) {
    return analysis;
};

const root_tone_from_fifth_position = function(idx) {
    if (idx < 0) { // flat
	var num_flats = Math.trunc((-1 * idx) / 8) + 1;
	idx += num_flats * 7;
	return make_tone(root_letters[idx % 7], -num_flats);
    }
    return make_tone(root_letters[idx % 7], Math.trunc(idx / 7));
};

const fifth_position = function (r) {
    return root_letters.indexOf(r.letter) + r.num_accidentals * 7;
};

const transition_analysis = function(r1, r2) {
    var f1 = fifth_position(r1), f2 = fifth_position(r2);
    if (f1 === f2) {
	return 'pm';
    }
    if (f2 === f1 - 1) {
	return 'sd';
    }
    if (f2 === f1 + 1) {
	return 'su';
    }
    if (f2 < f1) {
	return 'ld';
    }
    return 'lu';
};

const chordText = function(chord) {
    return root_text(chord.root) + quality_text(chord.quality);
};

const chords_eql = function(c1, c2) {
    return c1.root.letter == c2.root.letter && 
	c1.root.num_accidentals == c2.root.num_accidentals && 
	c1.quality == c2.quality;
}

const roman_numeral = function(scale_step, quality) {
    var numerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    var text = numerals[scale_step];
    if (quality == 'Maj' || quality == 'Dom') {
	text = text.toUpperCase();
	if (quality == 'Dom')
	    text += '7';
    } else if (quality == 'Dim') {
	text += ' o';
    }
    return text;
}

const compositionText = function(composition_chords, analyze_p, key) {
    var text = '';
    var chords = diatonic_chords(key);
    
    for (var i = 0; i < composition_chords.length; ++i) {
	var chord = composition_chords[i];
	text += chordText(chord);
	
	if (key) {
	    var scale_step = null;
	    for (var j = 0; j < chords.length; j++) {
		if (chords_eql(chord, chords[j])) {
		    scale_step = j;
		}
	    }
	    if (scale_step != null) {
		text += '(' + roman_numeral(scale_step, chord.quality) + ')';
	    }
	}
	
	text += ' ';
	var is_last_chord = i + 1 === composition_chords.length;
	if (analyze_p && !is_last_chord) {
	    var analysis = transition_analysis(chord.root, composition_chords[i + 1].root);
	    text += analysis_text(analysis) + ' ';
	}
    }
    return text;
};

const diatonic_chord = function(key, scale_step) {
    var p = fifth_position(key.root);
    scale_step = (scale_step - 1) % 7;
    var is_major = key.quality == 'Maj';
    var offset = is_major ? major_scale_offsets[scale_step] : minor_scale_offsets[scale_step];
    var quality = is_major ? major_qualities[scale_step] : minor_qualities[scale_step];
    var p2 = p + offset;
    var tone = root_tone_from_fifth_position(p2);
    return make_chord(tone, quality);
}

const diatonic_chords = function(key) {
    var chords = [];
    for (var i = 1; i < 8; i++) {
	chords.push(diatonic_chord(key, i));
    }
    return chords;
}

const c_major = make_chord(make_tone('c', 0), 'Maj');
const ab_minor = make_chord(make_tone('a', -1), 'Min');

const grand_cadence = function(key) {
    return [diatonic_chord(key, 1),
	    diatonic_chord(key, 4),
	    diatonic_chord(key, 1),
	    diatonic_chord(key, 5),
	    diatonic_chord(key, 1)
	   ];
}

function main() {
    var key = ab_minor;
    //var composition_chords = grand_cadence(key);
    var composition_chords = diatonic_chords(key);
    addElements([
	e("div", compositionText(composition_chords, true, key))
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
