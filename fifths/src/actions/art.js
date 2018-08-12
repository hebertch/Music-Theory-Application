// possible actions that will update the redux state

export const SET_CENTROIDS = 'SET_CENTROIDS';

export const setCentroids = centroids => ({ type: SET_CENTROIDS, centroids });
