package com.menevseoglu.okan.twitterhoaxfinder.request;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@Data
public class HoaxFinderSearchRequest {

    @NotEmpty
    @Length(max = 280)
    private String query;

    private String screenName;

    private String lang;
}