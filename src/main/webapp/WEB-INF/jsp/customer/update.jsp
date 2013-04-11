<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ include file="../inc/header.jsp"%>
<html>
    <head>
        <title>修改</title>
    </head>
    <body>
            修改<br/>
            =============<br/>
            <form:form method="PUT">
                <form:errors path="*"/><br/>

                <label for="customerName" class="label">客户名称:</label>
                <form:input path="customerName"/><br/>

                <label for="address" class="label">地址:</label>
                <form:input path="address"/><br/>

                <label for=linkman class="label">联系人:</label>
                <form:input path="linkman"/><br/>
				
				<label for=linkman class="label">邮政编码:</label>
                <form:input path="postCode"/><br/>
                <label for=linkman class="label">电话:</label>
                <form:input path="phone"/><br/>
                <label for=linkman class="label">传真:</label>
                <form:input path="fax"/><br/>
                <label for=linkman class="label">手机:</label>
                <form:input path="mobile"/><br/>
                <label for=linkman class="label">电子邮件:</label>
                <form:input path="email"/><br/>
                <label for=linkman class="label">城市:</label>
                <form:input path="cityName"/><br/>
                <label for=linkman class="label">省份:</label>
                <form:input path="provinceName"/><br/>
                <label for=linkman class="label">备注:</label>
                <form:input path="remark"/><br/>


                <label class="label"/><input type="submit" value="提交"/>&nbsp;<a href="<c:url value="/customer"/>">取消</a><br/>
            </form:form>
            =============<br/>
    </body>
</html>
