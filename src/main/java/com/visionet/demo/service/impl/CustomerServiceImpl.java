package com.visionet.demo.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.visionet.common.dao.IBaseDao;
import com.visionet.common.pagination.Page;
import com.visionet.common.pagination.PageUtil;
import com.visionet.common.service.impl.BaseService;
import com.visionet.demo.dao.CustomerDao;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.model.customer.CustomerQueryModel;
import com.visionet.demo.service.CustomerService;

/**
 * User: Visionet
 * Date: 12-1-4 上午11:06
 * Version: 1.0
 */

@Service("CustomerService")
public class CustomerServiceImpl extends BaseService<CustomerModel, Integer> implements CustomerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerServiceImpl.class);
    public CustomerServiceImpl(){
		System.out.println("----CustomerServiceImpl-------");
	}
    
    private CustomerDao customerDao;

    @Autowired
    @Qualifier("CustomerDao")
    @Override
    public void setBaseDao(IBaseDao<CustomerModel, Integer> customerDao) {
        this.baseDao = customerDao;
        this.customerDao = (CustomerDao) customerDao;
    }
    


    @Override
    public Page<CustomerModel> query(int pn, int pageSize, CustomerQueryModel command) {
        return PageUtil.getPage(customerDao.countQuery(command) ,pn, customerDao.query(pn, pageSize, command), pageSize);
    }
    
    @Override
    public List<CustomerModel> getCustomerListByCompanyId(Long companyId){
    	return customerDao.getCustomerListByCompanyId(companyId);
    }

   
}