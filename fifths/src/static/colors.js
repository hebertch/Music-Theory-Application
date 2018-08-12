// hex colors used for the wedges in the circle of fifths screen
// reused in other files as well
export const colors = [
  '#2860A6', '#2C96CF', '#2DAB94', '#96FF2C',
  '#FEF628', '#FDC530', '#F5933B', '#F0793E',
  '#E9313F', '#E14B9C', '#A84F9D', '#75529D', 
];

export const colorArraySelect = (scaleQuality) => {
  if (scaleQuality === 'maj') {
    return [
      '#A84F9D', '#75529D', '#2860A6', '#2C96CF',
      '#2DAB94', '#96FF2C', '#FEF628' /*root color*/, '#FDC530',
      '#F5933B', '#F0793E', '#E9313F', '#E14B9C', 
    ];
  } else {
    return [
      '#F0793E', '#E9313F', '#E14B9C', '#A84F9D',
      '#75529D', '#2860A6', '#2C96CF' /*root color*/, '#2DAB94',
      '#96FF2C', '#FEF628', '#FDC530', '#F5933B', 
    ];
  }
};
