import { useEffect } from 'react';
import { FlatList, Text } from 'react-native-gesture-handler';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

const HistoryScreen = () => {
    const [history,setHistory] = useState([]);

    useEffect(()=>{
        loadHistory();
    },[]);

    const loadHistory = async()=>{
        try{
            const history = await AsyncStorage.getItem('history');
            setHistory(JSON.parse(history));
        }catch(e){
            console.log(e);
        }
    };
    return (
        <View>
            <Text>History Screen</Text>
            <FlatList
            data={history}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=><Text>{item.name} -Completed at {item.date}</Text>} />
        </View>
    );
};

export default HistoryScreen;
