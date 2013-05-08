package com.visionet.demo.service;

import com.visionet.common.service.IBaseService;
import com.visionet.demo.model.loginuser.LoginUserModel;

public interface LoginService extends IBaseService<LoginUserModel, Integer>{
	LoginUserModel queryLoginUserInfoByUserName(String loginName);
}
