import {make_chord,
	make_analysis,
	fifth_position,
	root_tone_from_fifth_position,
	tonal_gravity_transition,
	relative_key,
	parallel_key,
	composition_analysis,
	major, minor, dominant, diminished,
	diatonic, borrowed, secondary_dominant, tritone, unknown,
	leap_up, step_up, leap_down, step_down, parallel_motion,
	f_natural, c_natural, g_natural, d_natural, a_natural,
	a_flat,
       } from '../src/components/Composition.js';

test('tones have a relative fifth position', () => {
    var tone1 = c_natural, tone2 = a_flat;
    var fifth_distance = (fifth_position(tone2) - fifth_position(tone1));
    var test = fifth_distance === -4 || fifth_distance === 8;
    expect(test).toBeTruthy();
});

test('fifth positions can be converted into tones', () => {
    var tone = a_flat;
    expect(root_tone_from_fifth_position(fifth_position(tone))).toEqual(tone);
});

test('tonal gravity: leap up', () => {
    var tone1 = c_natural, tone2 = d_natural;
    expect(tonal_gravity_transition(fifth_position(tone1), fifth_position(tone2))).toEqual(leap_up);
});

test('tonal gravity: step up', () => {
    var tone1 = c_natural, tone2 = g_natural;
    expect(tonal_gravity_transition(fifth_position(tone1), fifth_position(tone2))).toEqual(step_up);
});

test('tonal gravity: step down', () => {
    var tone1 = g_natural, tone2 = c_natural;
    expect(tonal_gravity_transition(fifth_position(tone1), fifth_position(tone2))).toEqual(step_down);
});

test('tonal gravity: leap down', () => {
    var tone1 = d_natural, tone2 = c_natural;
    expect(tonal_gravity_transition(fifth_position(tone1), fifth_position(tone2))).toEqual(leap_down);
});


test('tonal gravity: parallel motion', () => {
    var tone1 = c_natural, tone2 = c_natural;
    expect(tonal_gravity_transition(fifth_position(tone1), fifth_position(tone2))).toEqual(parallel_motion);
});

test('keys have relative keys', () => {
    var key = make_chord(c_natural, major);
    var relative = make_chord(a_natural, minor);
    expect(relative_key(key)).toEqual(relative); 
});

test('keys have parallel keys', () => {
    var key = make_chord(c_natural, major);
    var parallel = make_chord(c_natural, minor);
    expect(parallel_key(key)).toEqual(parallel);
});

test('composition_analysis: diatonic', () => {
    var key = make_chord(c_natural, major),
	chords = [make_chord(c_natural, major), // I
		  make_chord(f_natural, major), // IV
		  make_chord(c_natural, major), // I
		  make_chord(d_natural, minor), // vi
		  make_chord(g_natural, dominant), // V7
		  make_chord(c_natural, major) // I
		 ],
	expected = [make_analysis(chords[0], fifth_position(chords[0].root), diatonic, chords[1]),
		    make_analysis(chords[1], fifth_position(chords[1].root), diatonic, chords[2]),
		    make_analysis(chords[2], fifth_position(chords[2].root), diatonic, chords[3]),
		    make_analysis(chords[3], fifth_position(chords[3].root), diatonic, chords[4]),
		    make_analysis(chords[4], fifth_position(chords[4].root), diatonic, chords[5]),
		    make_analysis(chords[5], fifth_position(chords[5].root), diatonic, null),
		   ];
    expect(composition_analysis(chords, key)).toEqual(expected);
});


test('composition_analysis: secondary dominant', () => {
    var key = make_chord(c_natural, major),
	chords = [make_chord(d_natural, dominant), // V7/V7
		  make_chord(g_natural, dominant), // V7
		 ],
	expected = [make_analysis(chords[0], fifth_position(chords[0].root), secondary_dominant, chords[1]),
		    make_analysis(chords[1], fifth_position(chords[1].root), diatonic, null),
		   ];
    expect(composition_analysis(chords, key)).toEqual(expected);
});

test('composition_analysis: tritone', () => {
    var key = make_chord(c_natural, major),
	chords = [make_chord(a_flat, dominant), // TtV7/V7
		  make_chord(g_natural, dominant), // V7
		 ],
	expected = [make_analysis(chords[0], fifth_position(d_natural), tritone, chords[1]),
		    make_analysis(chords[1], fifth_position(chords[1].root), diatonic, null),
		   ];
    expect(composition_analysis(chords, key)).toEqual(expected);
});


test('composition_analysis: borrowed', () => {
    var key = make_chord(c_natural, major),
	chords = [make_chord(a_flat, major),
		 ],
	expected = [make_analysis(chords[0], fifth_position(chords[0].root), borrowed, null),
		   ];
    expect(composition_analysis(chords, key)).toEqual(expected);
});
