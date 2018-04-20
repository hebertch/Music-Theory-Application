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
const tonal_gravity_transition_texts = ['step up', 'step down', 'leap up', 'leap down', 'parallel motion'];


// Enum: Substitution types
const diatonic = 0;
const borrowed = 1;
const secondary_dominant = 2;
const tritone = 3;
const unknown = 4;
const substitution_texts = ['Diatonic', 'Borrowed', 'Secondary Dominant', 'Tritone', 'Unknown'];

const make_analysis = function(chord, fifth_position, type, next_chord) {
    return { chord: chord, fifth_position: fifth_position, type: type, next_chord: next_chord };
}

// Accidentals
// Natural is 0
// -1 for each flat
// +1 for each sharp
const double_flat = -2;
const flat = -1;
const natural = 0;
const sharp = 1;
const double_sharp = 2;

// Accidental Texts
const natural_text = 'NAT';
const flat_text = 'b';
const double_flat_text = 'bb';
const triple_flat_text = 'bbb';
const sharp_text = '#';
const double_sharp_text = '##';
const triple_sharp_text = '###';

const roman_numeral_texts = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

const roman_numeral_dominant_text = '7';
const roman_numeral_diminished_text = 'o';
const scale_length = 7;

// E.g.: C#, Ab, D, F##
const make_tone = function(letter, num_accidentals) {
    return { letter: letter,
	     num_accidentals: num_accidentals,
	   };
}

// List of common tones
const f_flat = make_tone('f', -1);
const c_flat = make_tone('c', -1);
const g_flat = make_tone('g', -1);
const d_flat = make_tone('d', -1);
const a_flat = make_tone('a', -1);
const e_flat = make_tone('e', -1);
const b_flat = make_tone('b', -1);
const f_natural = make_tone('f', 0);
const c_natural = make_tone('c', 0);
const g_natural = make_tone('g', 0);
const d_natural = make_tone('d', 0);
const a_natural = make_tone('a', 0);
const e_natural = make_tone('e', 0);
const b_natural = make_tone('b', 0);
const f_sharp = make_tone('f', 1);
const c_sharp = make_tone('c', 1);
const g_sharp = make_tone('g', 1);
const d_sharp = make_tone('d', 1);
const a_sharp = make_tone('a', 1);
const e_sharp = make_tone('e', 1);
const b_sharp = make_tone('b', 1);

// E.g.: C# Major, Ab Minor, D Dominant
const make_chord = function(root, quality) {
    return { root: root, quality: quality };
};

// E.g.: major, minor
const quality_text = function (quality) {
    return quality_texts[quality];
};

const accidental_text = function(num_accidentals) {
    // Convert number of accidentals to the appropriate text.
    switch (num_accidentals) {
    case -3: return triple_flat_text;
    case -2: return double_flat_text;
    case -1: return flat_text;
    case 1: return sharp_text;
    case 2: return double_sharp_text;
    case 3: return triple_sharp_text;
    }
    console.assert(num_accidentals >= -3 && num_accidentals <= 3, "Too many sharps or flats.")
    return '';
}

// Convert a root tone to text
const root_text = function (root) {
    return root.letter.toUpperCase() + accidental_text(root.num_accidentals);
};

const root_tone_from_fifth_position = function(idx) {
    // Convert an index into the circle of fifths into a tone
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

const tonal_gravity_transition = function(fifth_pos1, fifth_pos2) {
    // one of [lu, ld, su, sd, pm]
    // Calculate the transition from r1 to r2
    var f1 = fifth_pos1, f2 = fifth_pos2;
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

// Find position of element in list using ===
const position = function(element, list) {
    for (var i = 0; i < list.length; ++i) {
	if (element === list[i])
	    return i;
    }
    return null;
};

// Find index of chord in chords
const position_chord = function(chord, chords) {
    for (var j = 0; j < chords.length; j++) {
	if (chords_eql(chord, chords[j])) {
	    return j;
	}
    }
    return null;
};

// E.g. C <-> Am
const relative_key = function(key) {
    var key_pos = fifth_position(key.root),
	offset = key.quality === major ? 3 : -3,
	
	relative_key_quality = key.quality === major ? minor : major,
	relative_key_pos = key_pos + offset,
	relative_key_root_tone = root_tone_from_fifth_position(relative_key_pos);
    return make_chord(relative_key_root_tone, relative_key_quality);
};

// E.g. C <-> Cm
const parallel_key = function(key) {
    var parallel_key_quality = key.quality === major ? minor : major;
    return make_chord(key.root, parallel_key_quality);
};

const composition_chord_analysis = function(chord, next_chord, key_chords, parallel_key_chords) {
    // Analyze a chord as part of a composition_analysis
    if (position_chord(chord, key_chords) !== null)
	return make_analysis(chord, fifth_position(chord.root), diatonic, next_chord);
    if (position_chord(chord, parallel_key_chords))
	return make_analysis(chord, fifth_position(chord.root), borrowed, next_chord);

    if (chord.quality === dominant && 
	next_chord &&
	position_chord(next_chord, key_chords) &&
	fifth_position(chord.root) - 1 === fifth_position(next_chord.root)) {

	return make_analysis(chord, fifth_position(chord.root), secondary_dominant, next_chord);
    }

    if (chord.quality === dominant && 
	next_chord &&
	(fifth_position(chord.root) + 5 === fifth_position(next_chord.root) ||
	 fifth_position(chord.root) - 7 === fifth_position(next_chord.root))) {

	return make_analysis(chord, fifth_position(next_chord.root) + 1, tritone, next_chord);
    }

    return make_analysis(chord, fifth_position(chord.root), unknown, next_chord);
};

const composition_analysis = function(composition_chords, key) {
    // Analyse the composition_chords
    var key_chords = key_diatonic_chords(key), parallel_key_chords = key_diatonic_chords(parallel_key(key));
    var analysis = [];
    
    for (var i = 0; i < composition_chords.length; ++i) {
	var chord = composition_chords[i];
	var next_chord = i !== composition_chords.length-1 ? composition_chords[i + 1] : null;
	var tmp = composition_chord_analysis(chord, next_chord, key_chords, parallel_key_chords);
	analysis.push(tmp);
    }
    return analysis;
};

const key_diatonic_chord = function(key, scale_step) {
    // scale_step: 1-7
    var p = fifth_position(key.root);
    scale_step = (scale_step - 1) % 7;
    var is_major = key.quality == major;
    var offset = is_major ? major_scale_offsets[scale_step] : minor_scale_offsets[scale_step];
    var quality = is_major ? major_qualities[scale_step] : minor_qualities[scale_step];
    var p2 = p + offset;
    var tone = root_tone_from_fifth_position(p2);
    return make_chord(tone, quality);
};


const key_diatonic_chord_progression = function(key) {
    // all of the diatonic chords in key
    // I ii iii IV V7 vi viio (major)
    // i iio III iv v VI VII (minor)
    var chords = [];
    for (var i = 1; i < 8; i++) {
	chords.push(key_diatonic_chord(key, i));
    }
    // Also Add the non-dominant V
    key_diatonic_chord(key, );
    return chords;
};

const key_diatonic_chords = function(key) {
    // all of the diatonic chords in key + V in the major key
    // I ii iii IV V7 vi viio V (major)
    // i iio III iv v VI VII (minor)
    var chords = key_diatonic_chord_progression(key);
    // Also Add the non-dominant V for the major key.
    if (key.quality === major) {
	var chord = key_diatonic_chord(key, 5);
	chords.push(make_chord(chord.root, major));
    }
    return chords;
};

const major_scale_letters = function(root) {
    // all of the letters in the major scale for root
    var chords = key_diatonic_chords(make_chord(root, major));
    var letters = [];
    for (var i = 0; i < chords.length; ++i) {
	letters.push(chords[i].root.letter);
    }
    return letters;
}

const major_relative_roman_numeral_text = function(key, chord) {
    // Return the roman numeral text for the chord relative to the major key
    // I ii iii ... (major)
    // i iio bIII ... (parallel minor)
    var scale_idx = position(chord.root.letter, major_scale_letters(key.root));
    var major_chords = key_diatonic_chords(make_chord(key.root, major));
    var major_chord_num_accidentals = major_chords[scale_idx].root.num_accidentals;
    var text = roman_numeral_texts[scale_idx];

    if (chord.quality === major ||
	chord.quality === dominant) {
	text = text.toUpperCase();
    }

    switch (major_chord_num_accidentals - chord.root.num_accidentals) {
    case 1: text = flat_text + text; break;
    case 2: text = double_flat_text + text; break;
    case 3: text = triple_flat_text + text; break;
    case -1: text = sharp_text + text; break;
    case -2: text = double_sharp_text + text; break;
    case -3: text = triple_sharp_text + text; break;
    }

    if (chord.quality === dominant) {
	text = text + roman_numeral_dominant_text;
    } else if (chord.quality === diminished) {
	text = text + roman_numeral_diminished_text;
    }
    return text;
}

const c_major = make_chord(c_natural, major);
const a_flat_minor = make_chord(a_flat, minor);

const grand_cadence = function(key) {
    return [key_diatonic_chord(key, 1),
	    key_diatonic_chord(key, 4),
	    key_diatonic_chord(key, 1),
	    key_diatonic_chord(key, 5),
	    key_diatonic_chord(key, 1)
	   ];
}


// DOM Stuff -------
const set_css = function(css) {
    var style=document.createElement('style');
    style.type='text/css';

    if (style.styleSheet) {
	style.styleSheet.cssText = css;
    } else {
	style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}


const composition_chord_analysis_table_row = function(key, chord_analysis, previous_chord_analysis) {
    var chord = chord_analysis.chord;
    var next_chord = chord_analysis.next_chord;
    var fifth_position = chord_analysis.fifth_position;
    var type = chord_analysis.type;
    var substitution_text = '--', analyzed_text = major_relative_roman_numeral_text(key, chord);
    var transition_text =
	previous_chord_analysis ? 
	tonal_gravity_transition_texts[tonal_gravity_transition(previous_chord_analysis.fifth_position, fifth_position)] :
	'';
    switch (type) {
    case diatonic: break;
    case secondary_dominant:
	substitution_text = 'V7/' + major_relative_roman_numeral_text(key, next_chord);
	break;
    case borrowed: break;
    case tritone:
	var chord2 = make_chord(root_tone_from_fifth_position(fifth_position),
				chord.quality);
	substitution_text = 'TtV7/' + major_relative_roman_numeral_text(key, next_chord);
	analyzed_text = major_relative_roman_numeral_text(key, chord2);
	break;	
    }
    
    return [
	chord_text(chord),
	major_relative_roman_numeral_text(key, chord),
	substitution_texts[type],
	substitution_text,
	analyzed_text,
	fifth_position + '',
	transition_text
    ];
}

const composition_analysis_div = function(key, analysis) {
    var rows = [];
    rows.push(['Chord',
	       'Roman Numeral',
	       'Type',
	       'Substitution',
	       'Function(s)',
	       'Fifth Position',
	       'Tonal Gravity Motion',
	      ]);
    for (var i = 0; i < analysis.length; ++i) {
	var chord_analysis = analysis[i];
	var previous_chord_analysis = i > 0 ? analysis[i - 1] : null;
	rows.push(composition_chord_analysis_table_row(key, chord_analysis, previous_chord_analysis));
    }
    return div(table(rows));
}


function main() {
    var key = c_major;
    set_css('table, th, td { border: 1px solid black; }');
    //var composition_chords = grand_cadence(key);
    //var composition_chords = key_diatonic_chord_progression(key);
    var composition_chords = [
	make_chord(c_natural, major),
	make_chord(a_flat, dominant),
	make_chord(g_natural, dominant),
	make_chord(a_flat, dominant),
	make_chord(g_natural, major),
	make_chord(c_natural, major),
    ];
    addElements([
	div('Key: ' + chord_text(key)),
	composition_analysis_div(key, composition_analysis(composition_chords, key))
    ]);
}
window.onload = main;
