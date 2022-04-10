import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const QueueBar = (props) => {
	const {style, leaveQueue, currentQueueWaitTime, queueStatus} = props;

	const account = useSelector((state) => state.account);

	return (
			(() => {
				{
					switch (queueStatus) {
						case 'queuing':
							return (
                                <View style={[styles.queueBarContainer, style]}>
								<View style={styles.queueBarContent}>
									<View style={styles.queueBarInfo}>
										<Text style={styles.queueBarText}>
											Currently in a queue for
										</Text>
										<TouchableOpacity onPress={leaveQueue}>
											<View>
												<Text
													style={
														styles.leaveQueueBtnText
													}
												>
													Leave
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									<View style={styles.queueBarInfo}>
										<Text style={styles.queueBarText}>
											{account.currentQueueName}
										</Text>
										<Text>{`~${currentQueueWaitTime} mins`}</Text>
									</View>
								</View>
                                </View>
							);
						case 'reached':
							return (
                                <View style={[styles.queueBarContainer, style]}>
								<View
									style={[
										styles.queueBarContent,
										styles.queueReachedContainer,
									]}
								>
									<Text style={styles.queueBarText}>
										It's your turn!
									</Text>
									<Text
										style={styles.queueBarText}
									>{`Head back to ${account.currentQueueName} within 5 mins.`}</Text>
								</View>
                                </View>
							);
						case 'arrived':
							return (
                                
                                    <View style={[styles.queueBarContainer, style]}>
                                        <TouchableOpacity>
								<View
									style={[
										styles.queueBarContent,
										styles.queueReachedContainer,
									]}
								>
									<Text
										style={styles.queueBarText}
									>{`You are currently at ${account.currentQueueName}`}.</Text>
									<Text
										style={styles.queueBarText}
									>{`Expand to checkout of ${account.currentQueueName}`}.</Text>
								</View>
                                </TouchableOpacity>
                                </View>
							);
						default:
							return <></>;
					}
				}
			})()
		
	);
};

const styles = StyleSheet.create({
	queueBarContainer: {
		margin: 10,
		borderWidth: 1,
		borderColor: '#7879F1',
		backgroundColor: '#fff',
	},

	queueBarContent: {
		padding: 10,
	},

	queueBarInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	queueBarText: {
		color: '#5D5FEF',
		fontSize: 14,
		fontWeight: '700',
	},

	leaveQueueBtn: {
		backgroundColor: '',
	},

	leaveQueueBtnText: {
		color: '#EF5DA8',
	},

	queueReachedContainer: {
		backgroundColor: '#FCDDEC',
	},
});

export default QueueBar;
