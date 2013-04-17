package com.visionet.demo.service;

import java.util.List;

import com.visionet.common.model.datagrid.DataOptions;
import com.visionet.common.model.datagrid.ReGridData;
import com.visionet.common.pagination.Page;
import com.visionet.common.service.IBaseService;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.model.customer.CustomerQueryModel;

public interface CustomerService extends IBaseService<CustomerModel, Integer> {

    Page<CustomerModel> query(int pn, int pageSize, CustomerQueryModel command);
    
    public List<CustomerModel> getCustomerListByCompanyId(Long companyId);
    
    public ReGridData getCustomerListByPage(DataOptions dataOptions,CustomerModel customerModel);
    
  
}
