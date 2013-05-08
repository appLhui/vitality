package com.visionet.demo.dao;

import java.util.List;

import com.visionet.common.dao.IBaseDao;
import com.visionet.demo.model.user.UserModel;
import com.visionet.demo.model.user.UserQueryModel;


public interface UserDao extends IBaseDao<UserModel, Integer> {
    
    List<UserModel> query(int pn, int pageSize, UserQueryModel command);

    int countQuery(UserQueryModel command);
    
    
}
