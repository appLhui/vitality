package com.visionet.demo.dao.hibernate4;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.visionet.common.dao.hibernate4.BaseHibernateDao;
import com.visionet.demo.dao.CustomerDao;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.model.customer.CustomerQueryModel;

/**
 * User: Visionet
 * Date: 11-12-26 下午4:19
 * Version: 1.0
 */
@Repository("CustomerDao")
public class CustomerDaoImpl extends BaseHibernateDao<CustomerModel, Integer> implements CustomerDao {

    private static final String HQL_LIST = "from CustomerModel ";
    private static final String HQL_COUNT = "select count(*) from CustomerModel ";

    private static final String HQL_LIST_QUERY_CONDITION = " where customerName like ?";
    private static final String HQL_LIST_QUERY_ALL = HQL_LIST + HQL_LIST_QUERY_CONDITION + "order by id desc";
    private static final String HQL_COUNT_QUERY_ALL = HQL_COUNT + HQL_LIST_QUERY_CONDITION;

    @Override
    public List<CustomerModel> query(int pn, int pageSize, CustomerQueryModel command) {
        return list(HQL_LIST_QUERY_ALL, pn, pageSize, getQueryParam(command));
    }

    @Override
    public int countQuery(CustomerQueryModel command) {
        return this.<Number>aggregate(HQL_COUNT_QUERY_ALL, getQueryParam(command)).intValue();
    }
    

    private Object[] getQueryParam(CustomerQueryModel command) {
        //TODO 改成全文索引
        String customerNameLikeStr = "%" + command.getCustomerName() + "%";
        return new Object[]{
        		customerNameLikeStr
        };
    }

}
