package com.visionet.common.model.datagrid;

public class ReGridData {
	
	
	
    /**
	 * @param suc
	 * @param count
	 * @param end
	 * @param page
	 * @param pages
	 * @param start
	 * @param data
	 */
	public ReGridData(boolean suc, Integer count, Integer end, Integer page,
			Integer pages, Integer start, Object data) {
		super();
		this.suc = suc;
		this.count = count;
		this.end = end;
		this.page = page;
		this.pages = pages;
		this.start = start;
		this.data = data;
	}
	
	
	
	public ReGridData() {
		super();
	}



	/**
     * 操作是否成功
     */
	private boolean suc=true;
	/**
	 * 一共的条数
	 */
	private Integer count=0;
	/**
	 * 最后结束
	 */
	private Integer end=0;
    /**
     *  第几页数
     */
	private Integer page=1;
	/**
	 * 一共多少页
	 */
	private Integer pages=1;
	/**
	 * 开始条数
	 */
	private Integer start=0;
	/**
	 * 数据
	 */
	private Object data;
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
	 * @return the count
	 */
	public Integer getCount() {
		return count;
	}
	/**
	 * @param count the count to set
	 */
	public void setCount(Integer count) {
		this.count = count;
	}
	/**
	 * @return the end
	 */
	public Integer getEnd() {
		return end;
	}
	/**
	 * @param end the end to set
	 */
	public void setEnd(Integer end) {
		this.end = end;
	}
	/**
	 * @return the page
	 */
	public Integer getPage() {
		return page;
	}
	/**
	 * @param page the page to set
	 */
	public void setPage(Integer page) {
		this.page = page;
	}
	/**
	 * @return the pages
	 */
	public Integer getPages() {
		return pages;
	}
	/**
	 * @param pages the pages to set
	 */
	public void setPages(Integer pages) {
		this.pages = pages;
	}
	/**
	 * @return the start
	 */
	public Integer getStart() {
		return start;
	}
	/**
	 * @param start the start to set
	 */
	public void setStart(Integer start) {
		this.start = start;
	}
	/**
	 * @return the data
	 */
	public Object getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(Object data) {
		this.data = data;
	}
	
}
