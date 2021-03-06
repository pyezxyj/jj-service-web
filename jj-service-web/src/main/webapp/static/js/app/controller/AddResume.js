define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var citylist, config = {},
        positionKind = Dict.get("positionKind");
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin() && base.isPerson()){
            addAddress();
            addPositionKind();
            addListeners();
        }else{
            base.showMsg("您没有权限查看当前页面");
            setTimeout(function(){
                location.href = "./login.html?return=" + base.makeReturnUrl();
            }, 1000);
        }
    }

    function addPositionKind(){
        var html = "";
        for(var n in positionKind){
            html += '<div class="inblock mr10"><input type="checkbox" value="'+n+'"/>' + positionKind[n] + '</div>';
        }
        $("#expPosition").html(html);
    }

    function addAddress(){
        base.getAddress()
            .then(function(res){
                var temp_html = "", temp_html1 = "";
                citylist = res.citylist;
                var province = localStorage.getItem("province"),
                    city = localStorage.getItem("city"),
                    prov_id = 0;
                $.each(citylist,function(i,prov){
                    if(prov.p == province){
                        prov_id = i;
                        temp_html+="<option value='"+prov.p+"' selected>"+prov.p+"</option>";  
                    }else{
                        temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";                          
                    }
                });
                $.each(citylist[prov_id].c,function(i,city1){
                    if(city == city1.n){
                        temp_html1+="<option value='"+city1.n+"' selected>"+city1.n+"</option>";
                    }else{
                        temp_html1+="<option value='"+city1.n+"'>"+city1.n+"</option>";
                    }
                });
                $("#expProvince").append(temp_html);
                $("#expCity").append(temp_html1).removeAttr("disabled");
            })
    }

    function addListeners(){
        $("#expProvince").on("change", function(){
            var me = $(this);
            var prov_id = +me[0].selectedIndex,
                temp_html = "";
            $.each(citylist[prov_id].c,function(i,city){  
                temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";  
            });
            $("#expCity").removeAttr("disabled").html(temp_html);
        });
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
        $("#isWork").on("change", function(){
            var value = $(this).val();
            if(value == "0"){
                $("#workCont").addClass("hidden");
            }else{
                $("#workCont").removeClass("hidden");
            }
        });
        $("#sbtn").on("click", function(){
            var me = $(this);
            me.attr("disabled", "disabled").addClass("bg-loading");
            if(validate()){
                publishResume(me);
            }else{
                me.removeClass("bg-loading").removeAttr("disabled");
            }
        });
    }

    function validate(){
        var name = $("#name").val();
        if(!name || name.trim() === ""){
            base.showMsg("简历名称不能为空");
            return false;
        }
        config.name = name;
        var isWork = $("#isWork").val();
        if(isWork == null || isWork.trim() === ""){
            base.showMsg("是否有实习/工作经验不能为空");
            return false;
        }
        config.isWork = isWork;
        if(isWork == "1"){
            var preCompName = $("#preCompName").val();
            if(!preCompName || preCompName.trim() === ""){
                base.showMsg("公司名称不能为空");
                return false;
            }
            config.preCompName = preCompName;
            var prePosName = $("#prePosName").val();
            if(!prePosName || prePosName.trim() === ""){
                base.showMsg("职位名称不能为空");
                return false;
            }
            config.prePosName = prePosName;
            var preWorkTime = $("#preWorkTime").val();
            if(!preWorkTime || preWorkTime.trim() === ""){
                base.showMsg("工作时间不能为空");
                return false;
            }
            config.preWorkTime = preWorkTime;
            var preMsalary = $("#preMsalary").val();
            if(!preMsalary || preMsalary.trim() === ""){
                base.showMsg("职位月薪不能为空");
                return false;
            }
            config.preMsalary = preMsalary;
            var preDescription = $("#preDescription").val();
            if(!preDescription || preDescription.trim() === ""){
                base.showMsg("工作描述不能为空");
                return false;
            }
            config.preDescription = preDescription;
        }
        

        var eduRadio = $("#education").find("input[name='edu']:checked");
        if(!eduRadio.length){
            base.showMsg("学历/学位不能为空");
            return false;
        }
        config.education = eduRadio.val();
        var isTz = $("#isTz").find("input[type='radio']:checked");
        if(!isTz.length){
            base.showMsg("是否统招不能为空");
            return false;
        }
        config.isTz = isTz[0].value;
        var studyTime = $("#studyTime").val();
        if(!studyTime || studyTime.trim() === ""){
            base.showMsg("就读时间不能为空");
            return false;
        }
        config.studyTime = studyTime;
        var school = $("#school").val();
        if(!school || school.trim() === ""){
            base.showMsg("学校名称不能为空");
            return false;
        }
        config.school = school;
        var profession = $("#profession").val();
        if(!profession || profession.trim() === ""){
            base.showMsg("专业名称不能为空");
            return false;
        }
        config.profession = profession;
        var workRadio = $("#type").find("input[name='wType']:checked");
        if(!workRadio.length){
            base.showMsg("工作性质不能为空");
            return false;
        }
        config.type = workRadio.val();

        var checks = $("#expPosition").find("input[type='checkbox']:checked");
        if(!checks.length){
            base.showMsg("期望从事职业");
            return false;
        }
        var expPosition = "";
        for(var i = 0; i < checks.length; i++){
            expPosition = expPosition + checks[i].value;
        }
        config.expPosition = expPosition;

        var expMsalary = $("#expMsalary").val();
        if(!expMsalary || expMsalary.trim() === ""){
            base.showMsg("期望月薪不能为空");
            return false;
        }
        config.expMsalary = expMsalary;
        var expProvince = $("#expProvince").val();
        if(!expProvince || expProvince.trim() === ""){
            base.showMsg("期望工作地点省份不能为空");
            return false;
        }
        config.expProvince = expProvince;
        var expCity = $("#expCity").val();
        if(!expCity || expCity.trim() === ""){
            base.showMsg("期望工作地点城市不能为空");
            return false;
        }
        config.expCity = expCity;
        var workStatus = $("#workStatus").val();
        if(!workStatus || workStatus.trim() === ""){
            base.showMsg("工作状态不能为空");
            return false;
        }
        config.workStatus = workStatus;
        var isOpen = $("#isOpen").val();
        if(null == isOpen || isOpen.trim() === ""){
            base.showMsg("是否公开简历不能为空");
            return false;
        }
        config.isOpen = isOpen;
        return true;
    }

    function publishResume(me){
        base.publishResume(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增成功");
                    setTimeout(function(){
                        base.goBackUrl("./center.html");
                    }, 1000);
                }else{
                    me.removeClass("bg-loading").removeAttr("disabled");
                    base.showMsg(res.msg);
                }
            });
    }
});