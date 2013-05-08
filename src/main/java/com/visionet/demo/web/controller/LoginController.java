package com.visionet.demo.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.dne.core.password.PwdEncryptor;
import com.visionet.common.web.util.BaseController;
import com.visionet.demo.model.loginuser.LoginUserModel;
import com.visionet.demo.service.LoginService;
@Controller
@RequestMapping( { "/loginController" })
public class LoginController extends BaseController{
	 
	@Autowired
    @Qualifier("LoginService")
    private LoginService loginService;
	
	 @RequestMapping(value = "/login")
     public String login(HttpServletRequest request,String loginName,  String password,String language, HttpSession session ) throws Exception{
         LoginUserModel loginUserModel = loginService.queryLoginUserInfoByUserName(loginName);
           if(PwdEncryptor.encrypt(password).equals(loginUserModel.getPassword())){
        		   session.setAttribute("language", language);
        		   session.setAttribute("LoginUserVo", loginUserModel);
        		   return language+"/user";
           }else{
        	   return language+"login";
           }
	 }
}
