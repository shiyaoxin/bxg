define(['jquery'],function($){
	return {
		setMenu : function(pathname) {
			$('.aside .navs a').removeClass('active');
            $('.aside .navs a[href="'+pathname+'"]').addClass('active').closest('ul').show();
		},
		qs : function(attr,param) {
			// 例如  ?abc=123&flag=456
			var p = param.substring(1);
			var arr = p.split('&');
			var retValue = '';
			arr.forEach(function(element,index){
				var kv = element.split('=');
				if(attr = kv[0]){
					retValue = kv[1];
					//return的作用是结束循环
					return;
				}
			})
			return retValue;
		}
	}
})