import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import CircleOfFifthsReference from './circle-of-fifths';
import PerfectFifthReference from './perfect-fifth';
import MusicalGravityReference from './musical-gravity';
import HarmonicFunctionReference from './harmonic-function';
import KeySignaturesReference from './key-signatures';
import DiatonicReference from './diatonic';
import TonalGravityReference from './tonal-gravity';
import ParallelAndBorrowedReference from './parallel-and-borrowed';
import EnharmonicEquivalentsReference from './enharmonic-equivalents';
import ScaleDegreeReference from './scale-degree';
import DominantChordsReference from './dominant-chords';
import SecondaryDominantsReference from './secondary-dominants';
import DiatonicSubstitutesReference from './diatonic-substitutes';

const References = (props) => (
  <Swiper showButtons={true} index={props.index} >
    <CircleOfFifthsReference />
    <PerfectFifthReference />
    <MusicalGravityReference />
    <HarmonicFunctionReference />
    <KeySignaturesReference />
    <DiatonicReference />
    <TonalGravityReference />
    <ParallelAndBorrowedReference />
    <EnharmonicEquivalentsReference />
    <ScaleDegreeReference />
    <DominantChordsReference />
    <SecondaryDominantsReference />
    <DiatonicSubstitutesReference />
  </ Swiper>
);

// component
// accessed by the Main Menu sidebar
export const ReferencesContainer = () => (
  <References index={0} />
);

export const CircleOfFifthsReferenceContainer = () => (
  <References index={0} />
);

export const PerfectFifthReferenceContainer = () => (
  <References index={1} />
);

export const MusicalGravityReferenceContainer = () => (
  <References index={2} />
);

export const HarmonicFunctionReferenceContainer = () => (
  <References index={3} />
);

export const KeySignaturesReferenceContainer = () => (
  <References index={4} />
);

export const DiatonicReferenceContainer = () => (
  <References index={5} />
);

export const TonalGravityReferenceContainer = () => (
  <References index={6} />
);

export const ParallelAndBorrowedReferenceContainer = () => (
  <References index={7} />
);

export const EnharmonicEquivalentsReferenceContainer = () => (
  <References index={8} />
);

export const ScaleDegreeReferenceContainer = () => (
  <References index={9} />
);

export const DominantChordsReferenceContainer = () => (
  <References index={10} />
);

export const SecondaryDominantsReferenceContainer = () => (
  <References index={11} />
);

export const DiatonicSubstitutesReferenceContainer = () => (
  <References index={12} />
);

