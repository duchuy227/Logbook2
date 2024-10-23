import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert, } from 'react-native';

export default function App({ navigation }) {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);

    // Add Task or Update Existing Task
    const addOrUpdateTask = () => {
        if (taskName.trim() === '') {
            Alert.alert('Task name cannot be empty!!');
            return;
        }

        if (edit === false) {
            setTasks([...tasks, taskName]);

        } else {
            const updatedTasks = tasks.map((task, index) =>
                index === edit ? taskName : task
            );
            setTasks(updatedTasks);
            setEdit(false);
        }
        setTaskName('');
    };
    const editTask = (index) => {
        setTaskName(tasks[index]);
        setEdit(index);
    };
    const deleteTask = (index) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const updatedTasks = [...tasks]
                        updatedTasks.splice(index, 1);
                        setTasks(updatedTasks);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter task name"
                value={taskName}
                onChangeText={(name) => setTaskName(name)}
            />


            <Button
                title={edit !== false ? 'Update Task' : 'Add Task'}
                onPress={addOrUpdateTask}
            />


            <FlatList
                style={styles.list}
                data={tasks}
                renderItem={({ item, index }) => (
                    <View style={styles.listItem}>

                        <Text style={styles.listItemText}>{item}</Text>
                        <View style={styles.buttons}>

                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => editTask(index)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteTask(index)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    listItem: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#ffd700',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
});