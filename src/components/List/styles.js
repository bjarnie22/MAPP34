import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  selectedList: {
    backgroundColor: '#e0e0e0', 
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  checkmarkIcon: {
    marginRight: 10,
  },
  tasksContainer: {
    paddingTop: 10,
  },
  taskItem: {
    marginBottom: 5,
  },
  taskName: {
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});
