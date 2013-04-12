package com.visionet.common.model.datagrid;

public class DataOptions {
	
	/**
	 * 起始页数
	 */
	private Integer pageIndex;
	/**
	 * 每页显示条数
	 */
	private Integer pageSize;
	/**
	 * 升序降序
	 */
	private String sortDirection;
	/**
	 * 排序列名
	 */
	private String sortProperty;
	/**
	 * @return the pageIndex
	 */
	public Integer getPageIndex() {
		return pageIndex;
	}
	/**
	 * @param pageIndex the pageIndex to set
	 */
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	/**
	 * @return the pageSize
	 */
	public Integer getPageSize() {
		return pageSize;
	}
	/**
	 * @param pageSize the pageSize to set
	 */
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	/**
	 * @return the sortDirection
	 */
	public String getSortDirection() {
		return sortDirection;
	}
	/**
	 * @param sortDirection the sortDirection to set
	 */
	public void setSortDirection(String sortDirection) {
		this.sortDirection = sortDirection;
	}
	/**
	 * @return the sortProperty
	 */
	public String getSortProperty() {
		return sortProperty;
	}
	/**
	 * @param sortProperty the sortProperty to set
	 */
	public void setSortProperty(String sortProperty) {
		this.sortProperty = sortProperty;
	}
	
}
