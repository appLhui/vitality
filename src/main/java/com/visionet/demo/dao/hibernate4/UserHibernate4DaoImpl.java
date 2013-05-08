package com.visionet.demo.dao.hibernate4;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.visionet.common.dao.hibernate4.BaseHibernateDao;
import com.visionet.demo.dao.UserDao;
import com.visionet.demo.model.user.UserModel;
import com.visionet.demo.model.user.UserQueryModel;

/**
 * User: Visionet
 * Date: 11-12-26 下午4:19
 * Version: 1.0
 */
@Repository("UserDao")
public class UserHibernate4DaoImpl extends BaseHibernateDao<UserModel, Integer> implements UserDao {

    private static final String HQL_LIST = "from UserModel ";
    private static final String HQL_COUNT = "select count(*) from UserModel ";

    private static final String HQL_LIST_QUERY_CONDITION = " where username like ?";
    private static final String HQL_LIST_QUERY_ALL = HQL_LIST + HQL_LIST_QUERY_CONDITION + "order by id desc";
    private static final String HQL_COUNT_QUERY_ALL = HQL_COUNT + HQL_LIST_QUERY_CONDITION;

    @Override
    public List<UserModel> query(int pn, int pageSize, UserQueryModel command) {
        return list(HQL_LIST_QUERY_ALL, pn, pageSize, getQueryParam(command));
    }

    @Override
    public int countQuery(UserQueryModel command) {
        return this.<Number>aggregate(HQL_COUNT_QUERY_ALL, getQueryParam(command)).intValue();
    }
    

    private Object[] getQueryParam(UserQueryModel command) {
        //TODO 改成全文索引
        String usernameLikeStr = "%" + command.getUsername() + "%";
        return new Object[]{
            usernameLikeStr
        };
    }

	

}
