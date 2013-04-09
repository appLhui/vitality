package com.visionet.demo.service.impl;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.visionet.common.dao.IBaseDao;
import com.visionet.common.pagination.Page;
import com.visionet.common.pagination.PageUtil;
import com.visionet.common.service.impl.BaseService;
import com.visionet.demo.dao.UserDao;
import com.visionet.demo.model.user.UserModel;
import com.visionet.demo.model.user.UserQueryModel;
import com.visionet.demo.service.UserService;

/**
 * User: Visionet
 * Date: 12-1-4 上午11:06
 * Version: 1.0
 */

@Service("UserService")
public class UserServiceImpl extends BaseService<UserModel, Integer> implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserDao userDao;

    @Autowired
    @Qualifier("UserDao")
    @Override
    public void setBaseDao(IBaseDao<UserModel, Integer> userDao) {
        this.baseDao = userDao;
        this.userDao = (UserDao) userDao;
    }
    


    @Override
    public Page<UserModel> query(int pn, int pageSize, UserQueryModel command) {
        return PageUtil.getPage(userDao.countQuery(command) ,pn, userDao.query(pn, pageSize, command), pageSize);
    }

   
}