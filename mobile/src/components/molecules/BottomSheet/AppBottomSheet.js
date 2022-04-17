import React, { forwardRef } from "react";
import BottomSheet from "reanimated-bottom-sheet";

/**
 * Renders a opinionated {@link https://github.com/osdnk/react-native-reanimated-bottom-sheet|BottomSheet}.
 *
 * @category Components
 * @exports AppBottomSheet
 * @subcategory Molecules
 *
 * @example <caption>Default example</caption>
 * return(
 *   <AppBottomSheet
 *    ref={sheetRef}
 *		renderContent={MyReactComponent}							
 *		onCloseEnd={() => {console.log('Closed')}}
 *   </AppBottomSheet>
 * )
 *
 * @property {object(ref)} ref Reference to `AppBottomSheet` to be forwarded
 * @property {ReactNativeComponent} renderContent Functional component to be rendered within `AppBottomSheet`
 * @property {Function} onCloseEnd Callback used when `AppBottomSheet` is closed
 */

const AppBottomSheet = forwardRef((props, ref) => {
  const {renderContent, onCloseEnd} = props;
  
  const sheetRef = ref;

  return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        initialSnap={2}
        borderRadius={40}
        renderContent={() => renderContent(props)}
        enabledGestureInteraction={true}
        enabledContentGestureInteraction={true}
        onCloseEnd={onCloseEnd}
      />
  );
})

export default AppBottomSheet;