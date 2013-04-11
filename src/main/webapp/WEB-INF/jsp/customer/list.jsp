<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ include file="../inc/header.jsp"%>
<html>
    <head>
        <title>列表</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
    <a href="<c:url value='/customer/add'/>">新增</a><br/>
    <table border="1">
        <tr>
                        <th>客户名称</th>
                        <th>地址</th>
                        <th>联系人</th>
                        <th>电话</th>
                        <th>手机</th>
                        <th>邮件</th>
                        <th>城市</th>
                        <th>操作</th>
        </tr>
        <c:forEach items="${page.items}" var="t" varStatus="status">
        <tr>
                        <td>${ t.customerName }</td>
                        <td>${ t.address }</td>
                        <td>${ t.linkman }</td>
                        <td>${ t.phone }</td>
                        <td>${ t.mobile }</td>
                        <td>${ t.email }</td>
                        <td>${ t.cityName }</td>
                        <td><a href="<c:url value='/customer/${t.customerId}/delete'/>">删除</a>|<a href="<c:url value='/customer/${t.customerId}/update'/>">修改</a></td>
        </tr>
        </c:forEach>
    </table>
    <common:pageV2 url="/customer" optimize="true"/>
    </body>
</html>
