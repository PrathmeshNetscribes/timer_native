import { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import styles from './style';

const HomeScreen = ({navigation})=>{
    const [noOfTimers,setNumberOfTimers] = useState([]);
    const[name,setName] = useState('');
    const[time,setTime] = useState('');

    useEffect(()=>{
        loadTimers();
    },[]);

    const saveTimers = async()=>{
        try{
            await AsyncStorage.setItem('timers', JSON.stringify(noOfTimers));
        }catch(e){
            console.log(e);
        }
    };

    const loadTimers = async()=>{
        try{
            const timers = await AsyncStorage.getItem('timers');
            setNumberOfTimers(JSON.parse(timers));
        }catch(e){
            console.log(e);
        }
    };

    const addTimer = async()=>{
       if(!name || !time){
           return;
       }
       const newTimers = {id:Date.now(),name:name,time:parseInt(time),remaining:parseInt(time),running:false};
       const updatedTimers = [...noOfTimers,newTimers];
       setNumberOfTimers(updatedTimers);
       await saveTimers();
       setName('');
       setTime('');
    };

    const startTimer = async(id)=>{
        const updatedTimers = noOfTimers.map((timer)=>{
            if(timer.id === id){
                timer.running = true;
            }
            return timer;
        });
        setNumberOfTimers(updatedTimers);
        await saveTimers();
    };

    const pauseTimer = async(id)=>{
        const updatedTimers = noOfTimers.map((timer)=>{
            if(timer.id === id){
                timer.running = false;
            }
            return timer;
        });
        setNumberOfTimers(updatedTimers);
        await saveTimers();
    };

    const resetTimer = async(id)=>{
        const updatedTimers = noOfTimers.map((timer)=>{
            if(timer.id === id){
                timer.remaining = timer.time;
            }
            return timer;
        });
        setNumberOfTimers(updatedTimers);
        await saveTimers();
    };


    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TextInput placeholder="Timer Name" value={name} onChangeText={(text)=>setName(text)}/>
            <TextInput placeholder="Timer Time" value={time} onChangeText={(text)=>setTime(text)}/>
            <button onPress={addTimer}>Add Timer</button>
            <FlatList data={noOfTimers} renderItem={({item})=>(
                <View>
                    <View>
                    <Text>{item.name}</Text>
                    <Text>{item.time}</Text>
                    </View>
                    <View>
                        <Text>{item.name} - {item.remaining}</Text>
                        <ProgressBar progress={item.remaining / item.time}  width={200}/>
                    </View>
                    <View>
                        <Text>{item.name} - {item.remaining}</Text>
                        <Button title="Start" onPress={()=>startTimer(item.id)}/>
                        <Button title="Stop" onPress={()=>pauseTimer(item.id)}/>
                        <Button title="Reset" onPress={()=>resetTimer(item.id)}/>
                    </View>
                </View>

            )} />
        </View>
    );
};

export default HomeScreen;
