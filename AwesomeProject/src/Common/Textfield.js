import React, { Component } from 'react';
import {
	View,
	TextInput,
	Text,
	Image,
	StyleSheet,
	Animated,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types'

import * as colors from '../Common/colors'

const placeholderBottomMargin = 8
const selectedTint = 'green'
const unselectedTint = colors.LIGHT_COLOR
const errorTint = colors.PRIMARY_COLOR
const defaultFontSize = 17



class TextField extends Component {
	state = {
		isFocused: false,
		textinputHeight: 0,
		focusDescriptionInput: false,
		shouldShowError: false,
		errorMessage: '',
	};

	showError = (message) => {
		this.setState({
			shouldShowError: true,
			errorMessage: message
		})
	}
	hide = (clear) => {
		this.setState({
			shouldShowError: false,
			errorMessage: ''
		}/*, () => { this.props.clear(clear ? true : false) }*/)
	}

	error = () => {
		return (
			<View style={{ flexDirection: 'row', paddingVertical: 4, alignItems: 'center' }}>
				{/* <Image source={incorrect} resizeMode='center' /> */}
				{/* <View onTouchStart={()=>{this.hide(true)}} style={{ width: 18, height: 18, marginVertical: 5, borderRadius: 9, backgroundColor: errorTint, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>X</Text>
				</View> */}
				<Text style={{ color: errorTint, flex: 1, fontSize: 14, fontWeight: '400', marginHorizontal: 8 }}>{this.state.errorMessage}</Text>
			</View>
		)
	}

	handleFocus = () => {
		this.setState({
			isFocused: true
		});
	};

	handleBlur = () => {
		this.setState({
			isFocused: false
		});
	};

	componentWillMount() {
		this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
	}

	componentDidUpdate() {
		Animated.timing(this._animatedIsFocused, {
			toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
			duration: 200
		}).start();
	}

	_renderRightImage = () => {
		const imageJSX = this.props.rightImage ? (
			<TouchableOpacity
				onPress={() => {
					this.props.rightImageTapAction();
				}}
			>
				<Image
					style={{
						resizeMode: 'contain',
						height: this.state.textinputHeight
					}}
					source={this.props.rightImage}
				/>
			</TouchableOpacity>
		) : (
				<View />
			);
		return imageJSX;
	};

	renderInput = () => {
		const { label, ...props } = this.props;
		const borderStartingColor = this.state.shouldShowError ? errorTint : unselectedTint;
		const borderEndColor = this.state.shouldShowError ? errorTint : selectedTint;

		const labelStyle = {
			position: 'absolute',
			left: 0,
			bottom: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [placeholderBottomMargin + 5, this.state.textinputHeight + placeholderBottomMargin + 5]
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [defaultFontSize, 12]
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ['black', unselectedTint]
			})
		};

		const borderStyle = {
			backgroundColor: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [borderStartingColor, borderEndColor]
			})
		};
		return (
			<View>
				<View>
					<Animated.Text style={labelStyle}>{label}</Animated.Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TextInput
							{...this.props}
							keyboardAppearance="dark"
							style={{
								paddingBottom: 0,
								fontSize: defaultFontSize,
								color: '#000',
								backgroundColor: 'transparent',
								flex: 1,
							}}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							onLayout={(event) => {
								this.setState({
									textinputHeight: event.nativeEvent.layout.height
								});
							}}
						/>
						{this._renderRightImage()}
					</View>

					<Animated.View
						style={{
							height: 1,
							marginTop: placeholderBottomMargin,
							...borderStyle
						}}
					/>
				</View>
				{this.state.shouldShowError ? this.error() : <View />}

			</View>
		);
	};



	render() {
		const { label, ...props } = this.props;
		const borderStartingColor = this.state.shouldShowError ? errorTint : unselectedTint;
		var borderEndColor = this.state.shouldShowError ? errorTint : selectedTint;

		if(this.props.editable == false){
            borderEndColor = colors.LIGHT_COLOR
		}

		const labelStyle = {
			position: 'absolute',
			left: 0,
			bottom: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [placeholderBottomMargin + 5, this.state.textinputHeight + placeholderBottomMargin]
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [defaultFontSize, 14]
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ['black', unselectedTint]
			})
		};

		const borderStyle = {
			backgroundColor: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [borderStartingColor, borderEndColor]
			})
		};
		if (this.props.tappable === false) {
			return (
				<View style={{ backgroundColor: 'transparent', marginHorizontal: 30, marginVertical: 15, ...this.props.style }}>
					<View>
						<Animated.Text style={labelStyle}>{label}</Animated.Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<TextInput
								{...this.props}
								keyboardAppearance="dark"
								style={{
									paddingBottom: 0,
									fontSize: defaultFontSize,
									color: this.props.editable == false ? colors.LIGHT_COLOR : '#000',
									backgroundColor: 'transparent',
									flex: 1
								}}
								onFocus={this.handleFocus}
								onBlur={this.handleBlur}
								onLayout={(event) => {
									this.setState({
										textinputHeight: event.nativeEvent.layout.height
									});
								}}
							/>
							{this._renderRightImage()}
						</View>

						<Animated.View
							style={{
								height: 1,
								marginTop: placeholderBottomMargin,
								...borderStyle
							}}
						/>
					</View>


					{this.state.shouldShowError ? this.error() : <View />}

				</View>
			);
		} else {
			return (
				<TouchableHighlight
					style={{ ...this.props.style, backgroundColor: 'transparent' }}
					onPress={() => {
						this.props.onPress();
					}}
					underlayColor="#fff"
				>
					<View pointerEvents="none">
						{this.renderInput()}
					</View>
				</TouchableHighlight>
			);
		}
	}
}

TextField.propTypes = {
	isPasswordfield: PropTypes.bool,
	rightImage: PropTypes.any,
	rightImageTapAction: PropTypes.func,
	tappable: PropTypes.bool.isRequired,
	onPress: PropTypes.func
};

TextField.defaultProps = {
	isPasswordfield: false,
	rightImage: undefined,
	rightImageTapAction: () => { },
	tappable: false,
	onPress: () => { }
};

export default TextField;
