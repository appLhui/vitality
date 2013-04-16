/**
 * 2012-12-4
 */
package com.visionet.common.model.dataform;

/**
 * 
 * @author lh
 * @version 1.0 
 * @since 1.0
 */
public class Result<T> {

	private boolean suc=true;
	
	private String errorMsg;
	
	private T data;

	/**
	 * @return the suc
	 */
	public boolean isSuc() {
		return suc;
	}

	/**
	 * @param suc the suc to set
	 */
	public void setSuc(boolean suc) {
		this.suc = suc;
	}

	/**
	 * @return the errorMessage
	 */
	public String getErrorMsg() {
		return errorMsg;
	}

	/**
	 * @param errorMessage the errorMessage to set
	 */
	public void setErrorMessage(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	/**
	 * @return the data
	 */
	public T getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(T data) {
		this.data = data;
	}
	
	
	
	
}
