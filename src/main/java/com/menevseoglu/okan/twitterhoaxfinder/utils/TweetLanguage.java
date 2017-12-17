package com.menevseoglu.okan.twitterhoaxfinder.utils;

public enum TweetLanguage {
    EN("en"),
    TR("tr");

    private String label;

    TweetLanguage(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}