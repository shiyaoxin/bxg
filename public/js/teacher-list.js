define(['jquery','template','bootstrap'],function($,template){
	//加载列表
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function(data){
            // 解析数据并渲染页面
            var html = template('teacherInfoTpl',{list:data.result});
            $('#teacherInfo').html(html);

            // 查看讲师功能
            previewTeacher();

            // 注销和启用讲师
            enableOrDisableTeacher();
        }
    });

   
   //查看讲师功能
   function previewTeacher() {
   	//绑定查看讲师信息的单击事件
   	$('#teacherInfo').find('.preview').click(function(){
   		var tcId = $(this).closest('td').attr('data-id');
   		$.ajax({
   			type : 'get',
   			url : '/api/teacher/view',
   			data : {tc_id : tcId},
   			dataType : 'json',
   			success : function(data) {
   				// data.result.tc_hometown = data.result.tc_hometown.split('|'),join(' ');
   				var html = template('teacherModalInfoTpl',data.result);
   				$('#teacherModalInfo').html(html);

   				//显示弹框
   				$('#teacherModal').modal();
   			}
   		});

   		return false;

   	});
   }


	//注销讲师和启用讲师
   function enableOrDisableTeacher(){
        $('#teacherInfo').find('.edteacher').click(function(){
            var that = this;
            var td = $(this).closest('td');
            var tcId = td.attr('data-id');
            var tcStatus = td.attr('data-status');
            $.ajax({
                type : 'post',
                url : '/api/teacher/handle',
                data : {tc_id : tcId,tc_status : tcStatus},
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        td.attr('data-status',data.result.tc_status);
                        if(data.result.tc_status == 0){
                            $(that).text('注销');
                        }else{
                            $(that).text('启用');
                        }
                    }
                }
            });
        });
    }




})