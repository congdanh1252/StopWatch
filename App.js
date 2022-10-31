import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const runner = useRef();
  const startTime = useRef(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const resetLaps = () => {
    setLaps([])
  };

  const addLap = () => {
    let arr = [...laps]
    arr.push({
      id: arr.length + 1,
      value: timeElapsed
    })

    setLaps(arr)
  };

  const stopLap = () => {
    if (runner.current) {
      setIsRunning(false)
      clearInterval(runner.current);
    }
  };

  const startLap = () => {
    setIsRunning(true);
    startTime.current = new Date();

    runner.current = setInterval(() => {
      setTimeElapsed(new Date() - startTime.current)
    }, 30);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <Text style={styles.timeText}>{formatTime(timeElapsed)}</Text>

        <View style={styles.buttonStack}>
          <TouchableOpacity
            onPress={addLap}
            activeOpacity={0.7}
            style={[styles.btn, {backgroundColor: 'gray'}]}
          >
            <Text style={styles.blackText}>Lap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={resetLaps}
            activeOpacity={0.7}
            style={[styles.btn, {backgroundColor: 'gray'}]}
          >
            <Text style={styles.blackText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={isRunning ? styles.runningBtn : styles.btn}
            onPress={isRunning ? stopLap : startLap}
          >
            <Text style={styles.whiteText}>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={false}
          style={styles.lapContainer}
          showsVerticalScrollIndicator={false}
        >
          {
            laps.map(lap => {
              return (
                <View key={lap.id} style={styles.lapItem}>
                  <Text style={[styles.blackText, styles.lapId, styles.lapInfoText]}>
                    Lap #{lap.id}
                  </Text>

                  <Text style={[styles.blackText, styles.lapInfoText]}>
                    {formatTime(lap.value)}
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  blackText: {
    color: 'black'
  },
  whiteText: {
    color: 'white'
  },
  lapId: {
    fontWeight: 'bold'
  },
  lapInfoText: {
    fontSize: 20
  },
  timeText: {
    fontSize: 60,
    marginTop: 12,
    color: 'black',
    fontWeight: '500'
  },
  buttonStack: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  btn: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center'
  },
  runningBtn: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  lapContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  lapItem: {
    height: 60,
    padding: 12,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default App;
