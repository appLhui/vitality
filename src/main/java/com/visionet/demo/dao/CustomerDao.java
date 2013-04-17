package com.visionet.demo.dao;

import java.util.List;

import com.visionet.common.dao.IBaseDao;
import com.visionet.common.model.datagrid.DataOptions;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.model.customer.CustomerQueryModel;

public interface CustomerDao extends IBaseDao<CustomerModel, Integer> {
    
    List<CustomerModel> query(int pn, int pageSize, CustomerQueryModel command);
    
    List<CustomerModel> query(int pn, int pageSize, CustomerQueryModel command, DataOptions data);
    
    int countQuery(CustomerQueryModel command);
    
    public List<CustomerModel> getCustomerListByCompanyId(Long companyId);
    
    List<CustomerModel> queryByCondition(String hql);
    
    public int countAll();
}
