import React, { forwardRef } from "react";
import BottomSheet from "reanimated-bottom-sheet";

// Renders a opinionated BottomSheet

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