$(document).ready(function(){
	$("div#text").mouseup(function(){
		
		var text=window.getSelection();
		var textstr=text.toString();
		var preNode = text.anchorNode;
		if(textstr.trim!=""&&$(":radio:checked").val()){
			var value=$(":radio:checked").val();
			if(value=="clear"){
				//消除划取的多余区域
				//console.log(text.toString());
				//console.log(text.anchorNode.textContent);
				//console.log(preNode.parentNode.tagName);
				if(preNode.parentNode.tagName=="SPAN"){
					var textstr = text.toString();
					if(textstr==preNode.textContent){
					preNode.parentNode.replaceWith(preNode);
					}else{
						var className = preNode.parentNode.getAttribute("class");
						var element = document.createElement("span");
						element.className = className;
						var outText = document.createTextNode(textstr);
						if(text.anchorOffset==0||text.focusOffset==0){
							var anotherText = preNode.textContent.substring(Math.max(text.anchorOffset,text.focusOffset),preNode.textContent.length);
							var innerText = document.createTextNode(anotherText);
							element.appendChild(innerText);
							preNode.parentNode.replaceWith(element);
							element.parentNode.insertBefore(outText,element);
						}else if(text.anchorOffset==preNode.textContent.length||text.focusOffset==preNode.textContent.length){
							var anotherText = preNode.textContent.substring(0,Math.min(text.anchorOffset,text.focusOffset));
							var innerText = document.createTextNode(anotherText);
							element.appendChild(innerText);
							preNode.parentNode.replaceWith(outText);
							outText.parentNode.insertBefore(element,outText);
						}
					
					}
				}

				
			}else{
				//上色
				if(preNode.parentNode.tagName!="SPAN"){
					var range=text.getRangeAt(0);
					var ele = document.createElement("span");
					ele.className=value;
					range.surroundContents(ele);
					ele.innerHTML=ele.textContent; //内部node合成一个
					
				}
				
			}
		}

		window.getSelection().removeAllRanges();
	});
	//按下按钮获取字典
	$("button").click(function(){
		var data={"email":[],"phone":[]};
		$("span[class='email']").each(function(){
			data["email"].push($(this).text());
		});
		$("span[class='phone']").each(function(){
			data["phone"].push($(this).text());
		});
		//console.log(data);
		$.ajax({
			type: 'POST',
			url: "/getjson",
			data:JSON.stringify(data),  //转化字符串 
			contentType: 'application/json; charset=UTF-8',
			success:function(data){ //成功的话，得到消息
				$("#result").text("成功上传");
				console.log(data);
			},
			error: function(data, type) {
				$("#result").text("错误");
			}
		});	
	});
});
/*
$(document).ready(function(){
			//radio点击后改变划取字体
			$("input").click(function(){
				//去除选中状态
				window.getSelection().removeAllRanges();
				var item = $(this).val();
				//switch选择项目
				if(item=="email") $("#text").attr("class","red");
				else $("#text").attr("class","blue");

			});
*/