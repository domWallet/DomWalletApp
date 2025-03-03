import { Text, View } from "react-native";
import "../i18n"
import {useTranslation} from "react-i18next";


export default function Index() {
    const { t } = useTranslation()
    return (

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Edit app/index.tsx to edit this screen.</Text>
          <Text>{t('home:welcome')}</Text>
        </View>
    );
}
