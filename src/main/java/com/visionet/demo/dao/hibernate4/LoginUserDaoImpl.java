package com.visionet.demo.dao.hibernate4;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.visionet.common.dao.hibernate4.BaseHibernateDao;
import com.visionet.demo.dao.LoginUserDao;
import com.visionet.demo.model.loginuser.LoginUserModel;

@Repository("LoginUserDao")
public class LoginUserDaoImpl extends BaseHibernateDao<LoginUserModel, Integer> implements LoginUserDao{
    
	
	
	@Override
	public LoginUserModel queryLoginUserInfo(String loginName) {
		// TODO Auto-generated method stub
		String sql = "from LoginUserModel where loginName='"+loginName+"'";
		LoginUserModel	loginUserModel = null;		
		List<LoginUserModel> list = this.list(sql);
		if(list.size()>0){
			loginUserModel=list.get(0);			
		}
		return loginUserModel;
	}

}
