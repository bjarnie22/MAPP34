import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NUM_COLUMNS = 2;
const ITEM_MARGIN = 10;
const TOTAL_HORIZONTAL_MARGIN = ITEM_MARGIN * (NUM_COLUMNS + 1);

const ITEM_WIDTH = (SCREEN_WIDTH - TOTAL_HORIZONTAL_MARGIN) / NUM_COLUMNS;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boardContainer: {
    width: ITEM_WIDTH,
    marginBottom: ITEM_MARGIN,
    marginHorizontal: ITEM_MARGIN / 2,
  },
});
