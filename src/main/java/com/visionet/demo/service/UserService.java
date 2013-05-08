package com.visionet.demo.service;

import com.visionet.common.pagination.Page;
import com.visionet.common.service.IBaseService;
import com.visionet.demo.model.user.UserModel;
import com.visionet.demo.model.user.UserQueryModel;

/**
 * User: Visionet
 * Date: 12-1-4 上午10:13
 * Version: 1.0
 */
public interface UserService extends IBaseService<UserModel, Integer> {

    Page<UserModel> query(int pn, int pageSize, UserQueryModel command);
    
    
}
