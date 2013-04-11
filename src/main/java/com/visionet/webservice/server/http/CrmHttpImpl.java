package com.visionet.webservice.server.http;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.dne.sloth.webservice.http.CrmHttp;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.service.CustomerService;
import com.visionet.webservice.server.vo.CustomerInfo;


@WebService  
public class CrmHttpImpl implements CrmHttp{
	private static final Logger logger = LoggerFactory.getLogger(CrmHttpImpl.class);
	
	
	@Autowired
	private CustomerService customerService;
	
	public CustomerInfo getCustomerInfo(Integer customerId) throws Exception{
		CustomerModel cm =customerService.get(customerId);
		CustomerInfo ci = new CustomerInfo();
		BeanUtils.copyProperties(ci, cm);
		return ci;
	}
	
	public List<CustomerInfo> getCustomerInfoList(Long companyId) throws Exception{
		List<CustomerModel> cmList = customerService.getCustomerListByCompanyId(companyId);
		List<CustomerInfo> ciList = new ArrayList<CustomerInfo>();
		if(cmList!=null&&!cmList.isEmpty()){
			
			for(CustomerModel cm : cmList){
				CustomerInfo ci = new CustomerInfo();
				BeanUtils.copyProperties(ci, cm);
				ciList.add(ci);
			}
		}
		return ciList;
	}
	
	

	
}
