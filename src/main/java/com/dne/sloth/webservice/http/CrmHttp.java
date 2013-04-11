package com.dne.sloth.webservice.http;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

import com.visionet.webservice.server.vo.CustomerInfo;

@WebService
public interface CrmHttp {
	
	@WebMethod
	public CustomerInfo getCustomerInfo(Integer customerId) throws Exception;
	
	@WebMethod
	public List<CustomerInfo> getCustomerInfoList(Long companyId) throws Exception;
}
