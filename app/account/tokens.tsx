import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import uuid from "react-native-uuid";
import TokenInfo from "@/components/wallet/TokenInfo";
import {useEffect} from "react";
import SkeletonItem from "@/components/Skeleton/SkeletonItem";

interface props {
    tokenInfos: any
    refreshing: boolean,
    refreshingFn: any
}

const Tokens = ({tokenInfos, refreshing, refreshingFn}: props) => {


    const tokenInfoSkeleton = ()=>{
        return (
            <>
                <View style={styles.tokenInfoSkeletonContainer}>

                    <SkeletonItem width={70} height={70} borderRadius={20}/>

                    <View style={styles.infoContainer}>
                        <SkeletonItem width={150} height={39} borderRadius={12}/>

                        <SkeletonItem width={150} height={39} borderRadius={12}/>
                    </View>

                    <View style={styles.rightContainer}>
                        <SkeletonItem width={150} height={39} borderRadius={12}/>

                        <SkeletonItem width={150} height={39} borderRadius={12}/>
                    </View>

                </View>
            </>
        )
    }

    const SkeletonHolder = ()=>{

        return (
            <>
                <FlatList
                    data={[1,2,3,4]}
                    renderItem={tokenInfoSkeleton}
                    keyExtractor={(item) => uuid.v4().toString()}
                />
            </>
        )
    }

    const TokenList = ()=>{
        return (
            <>
                <FlatList
                    data={tokenInfos}
                    refreshing={refreshing}
                    onRefresh={refreshingFn}
                    renderItem={({item}) => (<TokenInfo icon={item.icon} name={item.name} amount={item.amount} change={item.change} price={item.price} sign={item.sign} worth={item.worth}/>)}
                    keyExtractor={(item) => uuid.v4().toString()}
                />
            </>
        )
    }


    return (
        <>
            <SafeAreaView style={styles.container}>
                {
                    tokenInfos.length > 0 ? <TokenList/> : <SkeletonHolder/>
                }

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height:"100%",
        backgroundColor: lightTheme.bg_main_color
    },
    tokenInfoSkeletonContainer:{
        width: "100%",
        height: ch(70),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: ch(60),
    },
    infoContainer: {
        justifyContent: "space-between",
        height: "100%",
        gap: ch(7),
        marginLeft: cw(24),
    },
    rightContainer: {
        marginLeft: "auto",
        height: "100%",
        justifyContent: "space-between",
        gap: ch(7),
        alignItems: "flex-end"
    }
})

export default Tokens


