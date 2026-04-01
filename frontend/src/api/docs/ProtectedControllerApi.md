# ProtectedControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**protectedPing**](#protectedping) | **GET** /api/protected | |

# **protectedPing**
> { [key: string]: object; } protectedPing()


### Example

```typescript
import {
    ProtectedControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProtectedControllerApi(configuration);

const { status, data } = await apiInstance.protectedPing();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: object; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

