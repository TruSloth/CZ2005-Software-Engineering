import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { updateCurrentQueue } from '../../../store/account/actions';
import { QUEUING, QUEUE_REACHED, IN_STORE, NOT_IN_QUEUE } from '../../../store/account/constants';

const QueueBar = (props) => {
	const {style, leaveQueue, currentQueueWaitTime, checkOut} = props;

    const dispatch = useDispatch()

	const account = useSelector((state) => state.account);

	return (
			(() => {
				{
					switch (account.queueStatus) {
						case QUEUING:
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
										<Text style={styles.waitTime}>{`~${currentQueueWaitTime} mins`}</Text>
									</View>
								</View>
                                </View>
							);
						case QUEUE_REACHED:
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
						case IN_STORE:
							return (
                                
                                    <View style={[styles.queueBarContainer, style]}>
                                        <TouchableOpacity onPress={checkOut}>
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
                        case NOT_IN_QUEUE:
                            return <></>
						default:
							return <Text>Error. Unknown Queue status</Text>;
					}
				}
			})()
		
	);
};

const styles = StyleSheet.create({
	queueBarContainer: {
		margin: 10,
		//borderWidth: 1,
		borderRadius: 10,
		borderColor: '#000000',
		backgroundColor: '#FFF8FA',
	},

	queueBarContent: {
		padding: 10,
	},

	queueBarInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	queueBarText: {
		color: '#000000',
		fontSize: 14,
		fontWeight: '700',
	},

	waitTime: {
		color: '#000000',
		fontSize: 14,
		fontWeight: '600',
	},	

	leaveQueueBtn: {
		backgroundColor: '',
	},

	leaveQueueBtnText: {
		color: '#E89575',
	},

	queueReachedContainer: {
		backgroundColor: '#FCDDEC',
	},
});

export default QueueBar;
