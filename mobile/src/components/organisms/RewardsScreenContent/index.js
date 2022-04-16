import React from 'react';
import {
	View,
	Text,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native';

import HorizontalBlock from '../../molecules/HorizontalBlock';
import HorizontalSection from '../../atoms/HorizontalSection';
import TappableCard from '../../atoms/TappableCard';

const RewardsScreenContent = () => {
    const accountPoints = [
		{
			title: '8888 Points',
			onPress: () => {
				console.log('Rewards pressed')
			},
		},
	];

    const qqBoutiqueRewards = [
        {
            imageAddress: 'https://i0.wp.com/www.joyces.ie/wp-content/uploads/2021/10/Apple_watch-series7_design_09142021_big.jpg.slideshow-large_2x-1.jpg?fit=650%2C650&ssl=1',
            itemName: 'Apple Watch Series 7 GPS 41mm',
            points: '299,500 Points',
        },
        {
            imageAddress: 'https://images-sg.girlstyle.com/wp-content/uploads/2022/01/d971660b.png?quality=90',
            itemName: 'Bruno Air Fryer',
            points: '69,000 Points',
        },
        {
            imageAddress: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-202203?wid=1765&hei=2000&fmt=jpeg&qlt=95&.v=1645665079887',
            itemName: 'Apple iPad Air Wi-Fi 64GB',
            points: '439,500 Points',
        },
        {
            imageAddress: 'https://scontent.fsin14-1.fna.fbcdn.net/v/t39.30808-6/240593011_3081396108810335_5504138749733621829_n.jpg?stp=cp0_dst-jpg_e15_q65_s320x320&_nc_cat=109&ccb=1-5&_nc_sid=8024bb&_nc_ohc=M4WdjJmdxi0AX-tAPzh&_nc_ht=scontent.fsin14-1.fna&oh=00_AT9zaqctkzHwPG_gJSOE8-U5p7AOOTnXFUY_MVVAsAj2-w&oe=62600D5E',
            itemName: 'TITAN Evo 2022 Plush Pink',
            points: '339,500 Points',
        }
    ];

    const foodAndBeverage = [
        {
            imageAddress: 'https://www.mcdonalds.com/content/dam/sites/usa/nfl/hero/Hero_McDelivery_Desktop_1168x520.jpg',
            itemName: '$5 off McDelivery',
            points: '2,500 Points',
        },
        {
            imageAddress: 'data:image/jpeg;base64,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',
            itemName: '$3 Starbucks Voucher',
            points: '1,500 Points',
        },
        {
            imageAddress: 'http://www.gong-cha-sg.com/wp-content/uploads/2017/11/tea-8.png',
            itemName: '$3 Gong Cha Voucher',
            points: '1,500 Points',
        },
        {
            imageAddress: 'https://www.gannett-cdn.com/presto/2022/02/01/USAT/05475eb9-2a7f-423f-b2cf-0d5b78bb6cd6-Dominos-menu_pan-pizza_lg.jpg?crop=4799,2699,x1,y601&width=3200&height=1800&format=pjpg&auto=webp',
            itemName: '1 Personal Pizza',
            points: '2,500 Points',
        }
    ]

    return (
        <View>
            <ScrollView>
                <HorizontalBlock
                    blockTitleStyle={styles.accountSettingHeader}
                    blockTitle={'You have rewards ready to be used!'}
                    blockElements={accountPoints}
                    blockElementTitlesStyle={styles.accountPoints}
                ></HorizontalBlock>
                <HorizontalSection
					child={
						<FlatList
							horizontal
                            style={styles.listStyle}
							data={qqBoutiqueRewards}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardImage={item.imageAddress}
										cardTitle={item.itemName}
										cardSubtextLine1={item.points}
                                        cardSubtextLine1Style={styles.subTextLine1}
										disableCardDesc={true}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={'QQueue Boutique'}
					titleStyle={styles.sectionHeader}
					style={styles.section}
				></HorizontalSection>
                <HorizontalSection
					child={
						<FlatList
							horizontal
                            style={styles.listStyle}
							data={foodAndBeverage}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardImage={item.imageAddress}
										cardTitle={item.itemName}
										cardSubtextLine1={item.points}
                                        cardSubtextLine1Style={styles.subTextLine1}
										disableCardDesc={true}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={'Food And Beverage'}
					titleStyle={styles.sectionHeader}
					style={styles.section}
				></HorizontalSection>
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
	accountPoints: {
		fontWeight: 'bold',
		fontSize: 48,
		alignSelf: 'center',
        color: '#E89575'
	},
    accountSettingHeader: {
		fontWeight: 'bold'
	},
    blockHeader: {
        backgroundColor: '#FCDDEC'
    },

    section: {
		borderColor: '#AAAAAA',
        padding: 0,
	},
	sectionHeader: {
		fontWeight: '700',
		fontSize: 16,
		color: '#000000',
        backgroundColor: '#FCDDEC',
        padding: 15,
	},
    subTextLine1: {
        color: '#000000',
        fontWeight: '500'
    },
    listStyle: {
        paddingHorizontal: 15
    }
});

export default RewardsScreenContent