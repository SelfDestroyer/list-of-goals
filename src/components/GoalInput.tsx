import React, { FC, SetStateAction, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  NativeSyntheticEvent, Platform,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import _ from 'lodash';
import IGoal from '../models/IGoal';
import Logo from '../assets/images/goal.png';

interface IGoalInput {
  readonly onCreateGoal: (callback: SetStateAction<IGoal[]>) => void;
  readonly modalIsVisible: boolean;
  readonly visibleModalHandler: () => void;
}

const GoalInput: FC<IGoalInput> = ({ onCreateGoal, modalIsVisible, visibleModalHandler }): JSX.Element => {
  const [userGoal, setUserGoal] = useState<string>('');

  const createAlert = (): void =>
    Alert.alert('Error', 'Field can\'t be empty', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  const goalInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => setUserGoal(e.nativeEvent.text);

  const addGoalHandler = (): void => {
    if (userGoal.length === 0) {
      createAlert();
    } else {
      onCreateGoal((prevState) => [...prevState, { goal: userGoal, id: _.uniqueId() }]);
      setUserGoal('');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Modal visible={modalIsVisible} animationType='slide'>
        <View style={styles.container}>
          <Image source={Logo} style={styles.image} />
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholderTextColor={'#5e0acc'} placeholder={'Your course goal!'}
                       onChange={goalInputHandler}
                       value={userGoal} />
          </View>
          <View style={styles.buttonGroup}>
            <Button title={'Add Goal'} color={Platform.OS === "android" ? '#5e0acc' : '#a971ff'} onPress={addGoalHandler} />
            <Button title={'Cansel'} color={'#f31282'} onPress={visibleModalHandler} />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#311b6b',
  },
  inputContainer: {
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    padding: 10,
    borderRadius: 8,
    color: '#120438',
  },
  buttonGroup: {
    marginTop: 10,
    width: 170,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: 'center',
  },
});


export default GoalInput;
