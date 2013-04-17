package com.visionet.demo.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.visionet.common.dao.IBaseDao;
import com.visionet.common.model.datagrid.DataOptions;
import com.visionet.common.model.datagrid.ReGridData;
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



	@Override
	public ReGridData getCustomerListByPage(
			DataOptions dataOptions,CustomerModel customerModel) {
		// TODO Auto-generated method stub
		ReGridData reGridData=new ReGridData();
		StringBuffer hql = new StringBuffer();

		CustomerQueryModel query = new CustomerQueryModel();
		query.setCustomerName(customerModel.getCustomerName());
		query.setAddress(customerModel.getAddress());
		query.setLinkman(customerModel.getLinkman());
		query.setPostCode(customerModel.getPostCode());
		query.setEmail(customerModel.getEmail());
		query.setCityName(customerModel.getEmail());
		
		List<CustomerModel> list=customerDao.query(dataOptions.getPageIndex()+1, dataOptions.getPageSize(), query ,dataOptions );
		int count = customerDao.countAll();
				
		reGridData.setData(list);
        reGridData.setCount(count);
        reGridData.setEnd(count);
        reGridData.setPage(dataOptions.getPageIndex()+1);
        int pages=0;
        if(count%dataOptions.getPageSize()==0){
        	pages=count/dataOptions.getPageSize();
        }else{
        	pages= count/dataOptions.getPageSize()+1;
        }
        reGridData.setPages(pages);
		return reGridData;
	}



   
}