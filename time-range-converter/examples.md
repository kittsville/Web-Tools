Last 30 minutes
```
{
    "start": "30m",
    "end": "now",
    "timezone": "Europe/London"
}
{"from":"now-30m","to":"now"}
```

Yesterday
```
{
    "start": "calendar: 1d@d",
    "end": "calendar: now@d-1ms",
    "timezone": "Europe/London"
}
{"from":"now-1d/d","to":"now-1d/d"}
```

Last 2 days
```
{
    "start": "2d",
    "end": "now",
    "timezone": "Europe/London"
}
{"from":"now-2d","to":"now"}
```

Absolute time range
```
{
    "start": "1758236400000",
    "end": "1758409199999",
    "timezone": "Europe/London"
}
{"from":"2025-09-19 00:00:00","to":"2025-09-20 23:59:59"}
```
