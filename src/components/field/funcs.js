'use strict'

export function shouldForwardToOnContentSizeChanged(multiline, os, event){
	return !!(multiline && os === 'android' && event.nativeEvent.contentSize);
}
