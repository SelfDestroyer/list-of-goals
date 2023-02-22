import React, { FC } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import IGoal from '../models/IGoal';

interface IGoalItem extends IGoal {
  readonly onRemoveGoal: (id: string) => void;
}

const GoalItem: FC<IGoalItem> = ({ goal, id, onRemoveGoal }): JSX.Element => {
  const androidRippleConfig = {
    color: '#350871',
    borderless: true,
  };

  const onPressHandler = ({ pressed }: { pressed: boolean }) => pressed && Platform.OS === 'ios' && styles.goalItemPressed;

  return (
    <View style={styles.goalItemMainContainer}>
      <Pressable android_ripple={androidRippleConfig} style={onPressHandler} onPress={onRemoveGoal.bind(this, id}>
        <View style={styles.goalItemContainer}>
          <Text style={styles.goalItemText}>{goal}</Text>
        </View>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  goalItemMainContainer: {
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#5e0acc',
  },
  goalItemContainer: {
    padding: 8,
  },
  goalItemText: {
    color: 'white',
  },
  goalItemPressed: {
    backgroundColor: '#350871',
    borderRadius: 6,
    opacity: 0.5
  },
});

export default GoalItem;
