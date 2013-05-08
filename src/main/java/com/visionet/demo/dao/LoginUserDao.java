package com.visionet.demo.dao;

import com.visionet.common.dao.IBaseDao;
import com.visionet.demo.model.loginuser.LoginUserModel;

public interface LoginUserDao extends IBaseDao<LoginUserModel, Integer>{
	LoginUserModel queryLoginUserInfo(String loginName);
}
