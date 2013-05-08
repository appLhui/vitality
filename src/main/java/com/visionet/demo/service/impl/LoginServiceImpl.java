package com.visionet.demo.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.visionet.common.dao.IBaseDao;
import com.visionet.common.service.impl.BaseService;
import com.visionet.demo.dao.LoginUserDao;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.model.loginuser.LoginUserModel;
import com.visionet.demo.service.LoginService;

@Service("LoginService")
public class LoginServiceImpl extends BaseService<LoginUserModel, Integer> implements LoginService {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private LoginUserDao loginUserDao;

    @Autowired
    @Qualifier("LoginUserDao")
    @Override
	public void setBaseDao(IBaseDao<LoginUserModel, Integer> loginUserDao) {
		// TODO Auto-generated method stub
		this.baseDao=loginUserDao;
		this.loginUserDao = (LoginUserDao) loginUserDao;
	}
    
   

	@Override
	public LoginUserModel queryLoginUserInfoByUserName(String loginName) {
		// TODO Auto-generated method stub
		return loginUserDao.queryLoginUserInfo(loginName);
	}

	
	

}
