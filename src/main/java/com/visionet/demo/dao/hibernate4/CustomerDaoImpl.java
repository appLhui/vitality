package com.visionet.demo.dao.hibernate4;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;

import com.visionet.common.dao.hibernate4.BaseHibernateDao;
import com.visionet.common.dao.util.ConditionQuery;
import com.visionet.common.dao.util.OrderBy;
import com.visionet.common.model.datagrid.DataOptions;
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
//        return list(HQL_LIST_QUERY_ALL, pn, pageSize, getQueryParam(command));
    	ConditionQuery query = new ConditionQuery();
    	query.add(Example.create(command));
    	
    	OrderBy orderBy = new OrderBy();
    	orderBy.add(Order.desc("customerId"));
    	
    	return this.list(query, orderBy, pn, pageSize);
    }
    
    @Override
	public List<CustomerModel> query(int pn, int pageSize,
			CustomerQueryModel command,DataOptions data) {
		// TODO Auto-generated method stub
    	ConditionQuery query = new ConditionQuery();
    	query.add(Example.create(command));
    	
    	OrderBy orderBy = new OrderBy();
    	if(null!=data.getSortProperty()&&!"".equals(data.getSortProperty())){
    		if("asc".equals(data.getSortDirection())){
    			orderBy.add(Order.asc(data.getSortProperty()));
    		}else if("desc".equals(data.getSortDirection())){
    			orderBy.add(Order.desc(data.getSortProperty()));
    		}
    		
    	}
    	
    	
    	return this.list(query, orderBy, pn, pageSize);
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
    
    public List<CustomerModel> getCustomerListByCompanyId(Long companyId){
    	CustomerModel cust = new CustomerModel();
    	cust.setCompanyId(companyId);
    	
    	Criteria crit = this.getSession().createCriteria(CustomerModel.class);
    	crit.add(Example.create(cust));
    	
    	return this.list(crit);
    }

	@Override
	public List<CustomerModel> queryByCondition(String hql) {
		// TODO Auto-generated method stub
		return this.list(HQL_LIST+hql);
	}

	public int countAll(){
		List list = this.list(HQL_COUNT);
		
		return Integer.parseInt(list.get(0).toString());
	}
	

}
