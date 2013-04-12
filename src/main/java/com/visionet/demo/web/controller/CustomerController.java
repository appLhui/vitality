package com.visionet.demo.web.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.visionet.common.Constants;
import com.visionet.common.model.datagrid.DataOptions;
import com.visionet.common.model.datagrid.ReGridData;
import com.visionet.common.pagination.Page;
import com.visionet.common.web.support.editor.DateEditor;
import com.visionet.common.web.util.BaseController;
import com.visionet.demo.model.customer.CustomerModel;
import com.visionet.demo.model.customer.CustomerQueryModel;
import com.visionet.demo.service.CustomerService;


@Controller
@RequestMapping( { "/customer" })
public class CustomerController extends BaseController{
	protected static final Logger LOGGER = LoggerFactory.getLogger(CustomerController.class);
	
    @Autowired
    @Qualifier("CustomerService")
    private CustomerService customerService;
    

    @RequestMapping(method = {RequestMethod.GET})
    public String list(HttpServletRequest request, Model model) {

        setCommonData(model);
        model.addAttribute(Constants.COMMAND, new CustomerModel());

        int pn = ServletRequestUtils.getIntParameter(request, "pn", 1);
        Integer id = ServletRequestUtils.getIntParameter(request, "id", -1);
        boolean pre = ServletRequestUtils.getBooleanParameter(request, "pre", false);
        Page<CustomerModel> page = null;
        if(id > 0) {
            if(pre) {
                page = customerService.pre(id, pn);
            }
            else {
                page = customerService.next(id, pn);
            }
        } 
        else {
            page = customerService.listAll(pn);
        }
        request.setAttribute("page", page);
        return "customer/list";
    }



    @RequestMapping(value = "/query", method = {RequestMethod.GET})
    public String query(HttpServletRequest request, Model model, @ModelAttribute("command") CustomerQueryModel command) {
        setCommonData(model);
        model.addAttribute(Constants.COMMAND, command);
        int pn = ServletRequestUtils.getIntParameter(request, "pn", 1);
        model.addAttribute("page", customerService.query(pn, Constants.DEFAULT_PAGE_SIZE, command));

        return "customer/list";
    }


    private void setCommonData(Model model) {
        //设置通用属性
    }

    @RequestMapping(value="/{customerId}/view", method = {RequestMethod.GET})
    public String view(@PathVariable Integer topicId, HttpServletRequest request) {
        request.setAttribute(Constants.COMMAND, customerService.get(topicId));
        return "customer/view";
    }



    
    @RequestMapping(value = "/add", method = {RequestMethod.GET})
    public String toAdd(Model model) {
        
        if(!model.containsAttribute(Constants.COMMAND)) {
            model.addAttribute(Constants.COMMAND, new CustomerModel());
        }
        setCommonData(model);
        return "customer/add";
    }
    
    @RequestMapping(value = "/{customerId}/update", method = {RequestMethod.GET})
    public String toUpdate(Model model, @PathVariable Integer customerId) {
        if(!model.containsAttribute(Constants.COMMAND)) {
            model.addAttribute(Constants.COMMAND,  customerService.get(customerId));
        }
        setCommonData(model);
        return "customer/update";
    }
    
    @RequestMapping(value = "/{customerId}/delete", method = {RequestMethod.GET})
    public String toDelete(@PathVariable Integer  customerId) {
        return "customer/delete";
    }


    @RequestMapping(value = "/add", method = {RequestMethod.POST})
    public String add(Model model, @ModelAttribute("command") @Valid CustomerModel command, BindingResult result) {
        
        //如果有验证错误 返回到form页面
        if(result.hasErrors()) {
            model.addAttribute(Constants.COMMAND, command);
            return toAdd(model);
        }
        command.setCompanyId(0L);
        customerService.save(command);
        return "redirect:/customer/success";
    }
    
    @RequestMapping(value = "/{customerId}/update", method = {RequestMethod.PUT})
    public String update(Model model, @ModelAttribute("command") @Valid CustomerModel command, BindingResult result) {
        if(result.hasErrors()) {
            model.addAttribute(Constants.COMMAND, command);
            return toUpdate(model, command.getCustomerId());
        }
        LOGGER.info("---xx--cid="+command.getCustomerId());
        customerService.update(command);
        return "redirect:/customer/success";
    }
    
    @RequestMapping(value = "/{customerId}/delete", method = {RequestMethod.DELETE})
    public String delete(@PathVariable Integer customerId) {
        customerService.delete(customerId);
        return "redirect:/customer/success";
    }
    
    @RequestMapping(value = "/success", method = {RequestMethod.GET})
    public String success() {
        return "customer/success";
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new DateEditor());
    }
  
    
  //李辉写的  
    
    
    @RequestMapping(value = "/users", method = {RequestMethod.GET})
    @ResponseBody
    public ReGridData getUsers(DataOptions options, HttpServletRequest request,Model model) {
     	
     	CustomerModel remodel=new CustomerModel();
     	  setCommonData(model);
          model.addAttribute(Constants.COMMAND, new CustomerModel());

          int pn = ServletRequestUtils.getIntParameter(request, "pn", 1);
          Integer id = ServletRequestUtils.getIntParameter(request, "id", -1);
          boolean pre = ServletRequestUtils.getBooleanParameter(request, "pre", false);
          Page<CustomerModel> page = null;
          if(id > 0) {
              if(pre) {
                  page = customerService.pre(id, pn);
              }
              else {
                  page = customerService.next(id, pn);
              }
          } 
          else {
              page = customerService.listAll(pn);
          }
          request.setAttribute("page", page);
     	
     	
          return new ReGridData(true,3,3,1,1,1,page.getItems());
    }

    
    
}
